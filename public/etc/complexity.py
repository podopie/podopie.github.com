%matplotlib inline
import random
from scipy import linalg, stats
import pandas as pd
import matplotlib.pyplot as plt

# time decorator
def timeit(fun):
    def wrapper(*args, **kw):
        b = time.time()
        fun(*args, **kw)
        return time.time() - b
    return wrapper

@timeit
def test_lst(x, y):
    linalg.lstsq(x, y)

n = range(1000, 10000)
k = range(1, 100)

def eval_complexity(i):
    nn = random.choice(n)
    kk = random.choice(k)
    randx = np.random.random_integers(0, 1000, (nn, kk,))
    y = np.arange(nn)
    return {
        'n': nn,
        'k': kk,
        'o': np.mean([test_lst(randx, y) for a in range(10)]),
    }

compute = pd.DataFrame([eval_complexity(i) for i in range(100)])

plt.figure()
#plt.plot(compute.k, compute.o, '.', alpha=1.0)
#plt.plot(compute.n, compute.o, '.', alpha=1.0)
#plt.plot((compute.k * compute.k * compute.n), compute.o, '.', alpha=1.0)
plt.title('Compute Time of Least Squares: $O(k^2n)$')
plt.xlabel('$k^2n$')
plt.ylabel('compute units')
