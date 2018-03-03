const NUM_SLOTS=9;

function minimax_decision(state){
	let act = actions(state);
	let max_val = -1000;
	let max_val_act = -1;

	for(let i=0; i<act.length; ++i){
		let a = act[i];
		let val_a = min_value(result(state.slice(), a, 'X'));
		max_val_act = max_val>val_a ? max_val_act : a;
		max_val = max_val > val_a ? max_val : val_a;
	}

	return max_val_act;
}

function max_value(state){
	if (terminal_test(state)){
		return utility(state);
	}

	let state_str = state.join('');

	let v = -1000; //-infinity
	let act = actions(state);
	for(let i=0; i<act.length;++i){
		let a = act[i];
		let v_tmp = min_value(result(state.slice(), a, 'X'));
		v = v>v_tmp ? v : v_tmp;
	}

	return v;
}

function min_value(state){
	if(terminal_test(state)){
		return utility(state);
	}
	
	let state_str = state.join('');

	let v = 1000; //infinity
	let act = actions(state);
	for(let i=0; i<act.length; ++i){
		let a = act[i];
		let v_tmp = max_value(result(state.slice(), a, 'O'));
		v = v<v_tmp ? v : v_tmp;
	}

	return v;
}


function actions(state){
	let free_slots = [];
	for(i=0; i<NUM_SLOTS; ++i){
		if(state[i] != 'X' && state[i] != 'O'){
			free_slots.push(i);
		}	
	}
	return free_slots;
}

function result(state, a, who){
	state[a] = who;
	return state;
}

function terminal_test(state){
	if(isWin(state) || isLoss(state) || isDraw(state)){
		return true;
	}

	return false;
}

function utility(state){
	if(isWin(state)){
		return 1;
	}else if(isLoss(state)){
		return -1;
	}else if(isDraw(state)){
		return 0;
	}else{
		return undefined;
	}	
}

function isWin(state){
	if(getWinner(state) == 'X'){
		return true;
	}	
	return false;
}

function isLoss(state){
	if(getWinner(state) == 'O'){
		return true;
	}	
	return false;
}

function isDraw(state){
	if(getWinner(state)){
		return false;
	}

	//draw
	let i = 0;
	for(; i<state.length; ++i){
		if(state[i] != 'X' && state[i] != 'O'){
			break;
		}
	}

	if(i == state.length){
		return true;
	}
	
	//game hasn't ended
	return false;	
}

function getWinner(state){
	if(inRow1(state)|| inCol1(state) || inDiag1(state)){
		return state[0];
	}else if(inRow2(state) || inCol2(state) || inDiag2(state)){
		return state[4];
	}else if(inRow3(state) || inCol3(state)){
		return state[8];
	}else{
		return undefined;
	}
}

function inRow1(state){
	return checkEqual(state, 0, 1, 2);
}

function inRow2(state){
	return checkEqual(state, 3, 4, 5);
}

function inRow3(state){
	return checkEqual(state, 6, 7, 8);
}

function inCol1(state){
	return checkEqual(state, 0, 3, 6);
}

function inCol2(state){
	return checkEqual(state, 1, 4, 7);
}

function inCol3(state){
	return checkEqual(state, 2, 5, 8);
}

function inDiag1(state){
	return checkEqual(state, 0, 4, 8);
}

function inDiag2(state){
	return checkEqual(state, 2, 4, 6);
}

function checkEqual(state, i, j, k){
	if(state[i] == state[j] && state[j]==state[k]){
		return true;
	}
	return false;
}

