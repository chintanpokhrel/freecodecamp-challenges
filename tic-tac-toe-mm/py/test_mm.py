from mm import *

def test_minimax_decision():
	pass

def test_max_value():
	pass

def test_min_value():
	pass

def test_actions():
	state=['X', 'O', '', '', 'X', '', 'X', 'O', '']	
	acts = actions(state)
	assert acts[0] == 2
	assert acts[1] == 3
	assert acts[2] == 5
	assert acts[3] == 8

def test_result():
	state = ['X', 'O', '', '', 'X', '', 'X', 'O', '']
	res_state = result(state, 2, 'O')
	assert res_state[2] == 'O'

def test_terminal_test():
	state = ['X', 'O', '', '', 'X', '', 'X', 'O', '']
	assert terminal_test(state) == False
	state = ['X', 'O', 'O', 'O', 'X', 'X', 'O', 'O', 'O']
	assert terminal_test(state) == True
	
def test_utility():
	pass	

def test_is_win():
	pass

def test_is_loss():
	pass

def test_is_draw():
	pass

def test_get_winner():
	pass

def test_check_equal():
	pass
