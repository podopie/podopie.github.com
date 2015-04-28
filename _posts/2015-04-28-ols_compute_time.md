---
layout: post
title: Ordinary Least Squares Compute Time
---

If scikit-learn's `linear_model.LinearRegression()` documentation lists this:

> From the implementation point of view, this is just plain Ordinary Least Squares (scipy.linalg.lstsq) wrapped as a predictor object.

Why might scikit-learn's implementation seem much faster than calling `linalg.lstsq()` on its own?

<img class='center' src='/public/images/s/sklearn_vs_scipy.png' width='480' />
<label class='center'>*The above chart created using `numpy.ones()`*</label>

It appears scikit will attempt to account for cases where features look the same. If you create random data instead with `numpy.random.random_integers()`:

<img class='center' src='/public/images/s/random_ols.png' width='480' />

You get exactly what you'd expect in terms of compute, where scikit should be a hair slower than scipy. Very cool!