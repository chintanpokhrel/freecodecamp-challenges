import mm
import mm_ab

def wrapper(func, *args, **kwargs):
	def wrapped():
		return func(*args, **kwargs)
	return wrapped

#wrapped = wrapper(mm.minimax_decision, ['', '', '', '', '', '', '', '', ''])

import timeit

#print "mm naive - ['', '', '', '', '', '', '', '', ''])"
#print timeit.timeit(wrapped, number=5)

#print "mm naive - ['', '', '', '', '', '', '', '', 'O'])"
#print timeit.timeit(wrapped, number=5)

#print "mm naive - ['', '', '', '', 'O', '', 'X', '', 'O'])"
#print timeit.timeit(wrapped, number=5)

print "mm alpha beta"

wrapped = wrapper(mm_ab.minimax_decision, ['', '', '', '', '', '', '', '', ''])

print timeit.timeit(wrapped, number=5)
