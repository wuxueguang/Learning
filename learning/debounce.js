
function debounce(cb, ms){
    let st;
    function debounced(){
        clearTimeout(st);
        st = setTimeout(cb, ms);
    }
    debounced.flush = () => {
        clearTimeout(st);
        cb.call();
    };
    debounced.cancel = () => clearTimeout(st);
    return debounced;
}

const d1 = debounce(() => console.log(111), 3000)
const d2 = debounce(() => console.log(222), 3000)
const d3 = debounce(() => console.log(333), 3000)


d1();

d2();

d3();

setTimeout(d2.flush, 1000);
setTimeout(d3.cancel, 2000);