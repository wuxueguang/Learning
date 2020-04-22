window.addEventListener('popstate', e => console.log(e));

const routes = 'abc';
document.querySelectorAll('button').forEach((ele, idx) => {
    ele.addEventListener('click', () => history.pushState({name: routes[idx]}, routes[idx], routes[idx]));
});