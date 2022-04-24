/**
 * @param {number} target
 * @return {number}
 */
 var racecar = function(target) {
  let ways = target > 0 ? [['+', target, 'need_recur']] : [['-', 0 - target, 'need_recur']];

const less_bigger = (function(){
  let _n_as = [0];

  return function(target){
    let less_target;
      let less_left;
      
      let bigger_target;
      let bigger_left;

    let i = 1;

    do{    			
      _n_as[i] = _n_as[i] || nA(i);

      if(_n_as[i] < target){
        less_target = _n_as[i];
        less_left   = target - _n_as[i];
      }else{
        bigger_target = _n_as[i];
        bigger_left = _n_as[i] - target;
        break;
      }
    }while(++i);

    if(bigger_left == 0){
      return {
        to_continue: false,
        value: target,
        length: i    		
        }
    }else{
      return {
        to_continue: true,
        less_target: {
          value: less_target,
          length: i - 1,
          left: less_left
        },
        bigger_target: {
          value: bigger_target,
          length: i,
          left: bigger_left
        }
      }
    }
  }
}());


function nA(n){
  let n_a;

  if(n == 0) { 
    n_a = 0;
  } else {
    n_a = Math.pow(2, n-1) + nA(n - 1);
  }
  return n_a;
}

function caculateWayCount(ways){
  let count = Number.POSITIVE_INFINITY;

  ways.forEach(item => {
    let tmp = 0;
    let plus_count = 0;
    let minus_count = 0;

    item.forEach(value => {
      //console.log('value', value)
      
      if(Number.isFinite(value)){
        tmp += value;
      }else{
        value == '+' ? plus_count++ : minus_count++;
      }
    })

    if(item[0] == '+'){
      plus_count -= 1;
      if(plus_count >= minus_count){
        tmp += plus_count * 2 
      }
      if(plus_count < minus_count){
        tmp = tmp + minus_count * 2 -1;
      }
    }else{
      if(plus_count >= minus_count){
        tmp += plus_count * 2;
      }else{
        tmp = tmp + minus_count * 2 - 1;
      }
    }
    //console.log(tmp)
    count = count > tmp ? tmp : count;
  });
  return count;
}

function recur(ways){
  let new_ways = [];

  ways.forEach(item => {		
    if(item[item.length - 1] == 'need_recur'){
      
      item.pop(); //delete recur flag
      let result = less_bigger(item.pop());
        let operator;

      if(result.to_continue){
        operator = item[item.length - 1] == '+' ? '+' : '-';
        new_ways.push([].concat(item, [result.less_target.length, operator, result.less_target.left, 'need_recur']));

        operator = item[item.length - 1] == '+' ? '-' : '+';
          new_ways.push([].concat(item, [result.bigger_target.length, operator, result.bigger_target.left, 'need_recur']));
        }else{
          new_ways.push([].concat(item, [result.length]));
        }
    }else{
      new_ways.push([].concat(item));
    }
  });

  if(new_ways.some(item => item[item.length - 1] == 'need_recur')){
    return recur(new_ways)
  }else{
    return new_ways;
  }
}

let ret = recur(ways);
  return caculateWayCount(ret);
};