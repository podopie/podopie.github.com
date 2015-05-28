---
layout: post
title: Setting up Shiny, Shiny-Server, and Nginx on EC2
tags:
    - r
---

When I led the data team at Homejoy, many other teams were heavily dependent on update-able data views. As a team that all at least knew R, we ended up developing a stack of shiny applications that handled specific team or data problems, be it calculating metrics, or a CRM-like tool to grab emails and phone numbers that required interaction each day.

Conceptually this was straightforward: we built a framework around shiny to grab postgreSQL connections using dplyr, and most of the stack interacted with SQL queries, light data transforms, and presenting the data back in tables or using rCharts.

Here's a one pager on setting up an EC2 Ubuntu instance to serve your shiny apps with shiny server and nginx.

# Preliminary installations

Assuming you haven't set up anything yet, from scratch we need to apt-get R, gdebi-core, and nginx.

    sudo apt-get update
    sudo apt-get install r-base r-base-dev gdebi-core nginx

Next, we'll need to do a system install of shiny. You can do this with sudo from the command line; doing a user install won't work with shiny-server.

    sudo su - \
      -c "R -e \"install.packages('shiny', repos='http://cran.rstudio.com/')\""
    R -e 'library(shiny)'

To install shiny-server, we'll use wget to grab the debian package and install using gdebi.

    wget http://download3.rstudio.org/ubuntu-12.04/x86_64/shiny-server-1.3.0.403-amd64.deb
    sudo gdebi shiny-server-1.3.0.403-amd64.deb

To start testing things out, put a sample app somewhere. For the purposes here, I put mine in /home/ubuntu/iris, using [Joe Cheng's](https://github.com/jcheng5) sample iris app. Edit shiny-server.conf to serve this endpoint:

`/etc/shiny-server/shiny-server.conf`

    # Instruct Shiny Server to run applications as the user "shiny"
    run_as shiny;

    # Define a server that listens on port 3838
    server {
      listen 3838;

      # Define a location at the base URL
      location / {

        # Host the location of the shiny app
        app_dir /home/ubuntu/iris;

        # Log all Shiny output to files in this directory
        log_dir /var/log/shiny-server;
      }
    }

Then, reload:

    reload shiny-server

# Setting up nginx

Here's a working default file for nginx using the otherwise default settings for shiny-server:

`/etc/nginx/sites-enabled/default`

    server {
            listen 80 default_server;
            listen [::]:80 default_server ipv6only=on;

            server_name localhost;

            location / {
                    proxy_pass http://localhost:3838/;
                    proxy_redirect http://localhost:3838/ $scheme://$host/;
            }
    }

And reload nginx:

    sudo /etc/init.d/nginx restart

You can now test your ec2 instance at the public ip address; you should get the app loading, and you're good to go! To serve this more privately/internally, you'll likely want to attach an elastic ip address and then set up the rest with your domain hosting service.
