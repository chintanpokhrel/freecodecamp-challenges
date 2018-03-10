NUM_SLOTS=9
INFINITY=1000
def minimax_decision(state):
	act = actions(state)
	max_val = -INFINITY
	max_val_act = -1

	for a in act:
		val_a = min_value(result(state[:], a, 'X'), -INFINITY, +INFINITY)
		max_val_act = max_val_act if max_val>val_a else a
		max_val = max_val if max_val > val_a else val_a
	
	return max_val_act


def max_value(state, alpha, beta):
	if (terminal_test(state)):
		return utility(state)
	
	v = -INFINITY 
	act = actions(state)
	for a in act:
		v = max(v, min_value(result(state[:], a, 'X'), alpha, beta))
		if v >= beta:
			return v
		alpha = max(alpha, v)
		
	return v


def min_value(state, alpha, beta):
	if(terminal_test(state)):
		return utility(state)
	
	v = INFINITY 
	act = actions(state)
	for a in act:
		v = min(v, max_value(result(state[:], a, 'O'), alpha, beta))
		if v <= alpha:
			return v
		beta = min(beta, v)

	return v


#Return available moves - i.e. the blank slots
def actions(state):
	free_slots = []
	for i in range(NUM_SLOTS):
		if(state[i] not in ['X','O']):
			free_slots.append(i)
			
	return free_slots


def result(state, a, who):
	state[a] = who
	return state


def terminal_test(state):
	if(is_win(state)  or  is_loss(state)  or  is_draw(state)):
		return True
	
	return False


def utility(state):
	if(is_win(state)):
		return 1
	elif(is_loss(state)):
		return -1
	elif(is_draw(state)):
		return 0
	else:
		return None
		

def is_win(state):
	if(get_winner(state) == 'X'):
		return True
		
	return False


def is_loss(state):
	if(get_winner(state) == 'O'):
		return True
		
	return False


#No winner and all slots are filled
def is_draw(state):
	if(get_winner(state)):
		return False
	
	i = 0
	while i<len(state):
		if(state[i] != 'X'  and  state[i] != 'O'):
			break
		i = i+1
		
	if(i == len(state)):
		return True
	
	return False	


def get_winner(state):
	if(in_row1(state) or  in_col1(state)  or  in_diag1(state)):
		return state[0]
	elif(in_row2(state)  or  in_col2(state)  or  in_diag2(state)):
		return state[4]
	elif(in_row3(state)  or  in_col3(state)):
		return state[8]
	else:
		return None
	

def in_row1(state):
	return check_equal(state, 0, 1, 2)


def in_row2(state):
	return check_equal(state, 3, 4, 5)


def in_row3(state):
	return check_equal(state, 6, 7, 8)


def in_col1(state):
	return check_equal(state, 0, 3, 6)


def in_col2(state):
	return check_equal(state, 1, 4, 7)


def in_col3(state):
	return check_equal(state, 2, 5, 8)


def in_diag1(state):
	return check_equal(state, 0, 4, 8)


def in_diag2(state):
	return check_equal(state, 2, 4, 6)


def check_equal(state, i, j, k):
	if(state[i] == state[j]  and  state[j]==state[k]):
		return True
	
	return False


