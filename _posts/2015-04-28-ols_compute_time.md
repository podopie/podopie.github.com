---
layout: post
title: Ordinary Least Squares Compute Time
---

Scikit-learn's `linear_model.LinearRegression()` documentation lists:

> From the implementation point of view, this is just plain Ordinary Least Squares (scipy.linalg.lstsq) wrapped as a predictor object.

Why might scikit-learn's implementation seem much faster than calling `linalg.lstsq()` on its own?

<img class='center' src='/public/images/s/sklearn_vs_scipy.png' width='480' />
<label class='center'>*The above chart created using `numpy.ones()`*</label>

It appears scikit will cache results to precalculate features that haven't changed. If you use random data instead with `numpy.random.random_integers()`:

<img class='center' src='/public/images/s/random_ols.png' width='480' />

The results are more comparable.