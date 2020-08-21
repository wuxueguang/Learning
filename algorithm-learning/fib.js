let counter = 0;

function fib(n){
	return n < 3 ? 1 : arguments.callee(n - 1) + arguments.callee(n - 2);
}


function fib1(n){
	let anwser = last = next2Last = 1;

	if(n > 2){
		for(let i = 3; i <= n; i++){
			anwser = last + next2Last;
			next2Last = last;
			last = anwser;
		}
	}
	
	return anwser;
}


// ?????
function c(n){    // c(0) = 0; c(1) = 1; c(2) = 2;
	let sum = 0;
	for(let i = 1; i < n; i++){
		sum += c(i);
	}
	return (2 / n) * sum + n;
}

function c1(n){
	let sum = last = 0;
	if(n > 1){
		for(let i = 2; i < n; i++){
			sum += c(i);
		}
	}
	
	return (2 / n) * sum + n;
}




