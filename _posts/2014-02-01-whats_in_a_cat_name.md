---
layout: post
title: What's in a (cat) Name
---

{{ page.title }}
================
<a href='http://framed.io'>Framed Data</a> sets up hack nights where friends can visit, check out the office, and hack on <a href="https://github.com/zenkalia/active_decimal">small personal projects</a>. It's been awhile since I have worked on one myself, so decidedly, I hacked on cats. And who doesn't like cats?

(For the record, I really don't like cats. I just like using them in <a href="http://www.hilarymason.com/speaking/speaking-1-kitten-per-equation/">presentations</a>.)

Data to start with
------------------------
I dug through a few different websites using Google search, ultimately landing on <a href="http://www.petfinder.com">Petfinder</a> for data collection. I liked the search process from a web view, and it was relatively easy to find the json they send through the server. The data scaper used ehutzelman's <a href="https://github.com/ehutzelman/petfinder">petfinder</a> Ruby gem, and it polled Petfinder a couple nights in a row until the project had a decently sized data set–roughly 38,000 unique cats.

As features, I exposed what I could: db id (to ensure uniqueness), name, gender, breeds, and size.

Data munging (or "what I learned about cats")
------------------------

As always, it's expected that the majority of work on any data problem will be cleanup. Here, that meant learning a bit about what different cat breeds are, in order to best understand trends in breed and name origin. While some basics were involved (refining all text to lowercase, for example), there certainly required more brute work to produce a clean data set.

What I ultimately learned: ***most people don't actually know cat breeds***.

<img src="/public/images/cat_color_as_breed.png" width="550" height="400" />

Once I had a unique list of cat breeds, it was time to investigate what each breed looked like. I often found that many of the cat breeds listed were not breeds at all. Cat "breeds" like calico, tortoiseshell, tabby, and tortie actually explained the pattern and color of the cat's hair, but were different from the actual breeds, such as Manx, Javanese, Ragdoll, or Chartreux.

<img class="center" src="/public/images/calico_cat.jpg" width="429" height="322" />
<label class="center">*Fool, colors ain't a breed!*</label>

While some of these cats had a secondary breed that consisted of a real cat breed, just shy of 9000 cats could no longer be identified by a breed, 23% of the data set.

Finally, I removed name outliers. Since I was mostly interested in how people name cats, I used `ddply` to count cat name frequency and removed names that occured infrequently, leaving 14 names.

Data findings
-------------
To no surprise, if many do not know what their cat's breed is, then it was less likely to expect any correlation in naming. Instead, turning to the cat's color and size, I found some obvious but neat determinators of what a cat's name will be.

###Cat color
A cat's color can be very indicative for certain names. Calico cats tend to be named Callie, black and white cats often named Oreo, and black cats hover between Midnight and Shadow. Below, I called to attention some clear preferences to names based on color, where Baby, Bella, and Lucy show what the typical distribution looked like based on color.

<img src="/public/images/cat_colors.png" width="550" height="400" />

Although Midnight (79 cats) and Shadow (89) seem like gender ambiguous names, checking distribution based on gender suggested otherwise:

<img src="/public/images/black_cats.png" width="550" height="172" />

###Cat size
There also displayed light correlations with a cat's size and its name. Here, I considered only female cats. Females represented the majority of the data, and this split also removed the likelihood that the cat was larger because it was male. I also filtered down to show two distinct sizes: small and large. I removed medium since it's not clear how a cat would be labeled medium vs small or large, and also removed extra large since it had a small sample size.

<img src="/public/images/cats_size.png" width="550" height="172" />

The data seems to suggest some cat names are more common in larger female cats than small female cats, Gracie and Molly being exceptionally small cats, vs Midnight, which, compared to Gracie and Molly, was almost twice more often a larger cat. Why? Who knows. Cats make me sneeze.

Next Steps
----------
Interestingly enough, the most common cat name ended up being Bella, though my bet? There's some <a href="http://en.wikipedia.org/wiki/Twilight_(series)">outside influence</a>.

To save time, I completely avoided working with the text descriptions of each cat, though I imagine by processing the text more details can be extracted to explain details about cats that aren't captured in the breed, color, and size.