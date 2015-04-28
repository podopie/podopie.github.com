---
layout: post
title: Ordinary Least Squares Compute Time
---

If scikit-learn's `linear_model.LinearRegression()` documentation lists this:

> From the implementation point of view, this is just plain Ordinary Least Squares (scipy.linalg.lstsq) wrapped as a predictor object.

Why is scikit-learn's implementation so much faster than calling `linalg.lstsq()` on its own?

<img class='center' src='/public/images/s/sklearn_vs_scipy.png' width='480' />