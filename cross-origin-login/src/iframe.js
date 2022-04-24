
const sourceOrigin = unescape(/(?<=\?domain=).+$/.exec(location.search)[0]);

window.addEventListener('message', async (e) => {
    const { data: { type, data }} = e;
    switch(type){
    case 'login':
        top.postMessage({
            type: 'logined',
            userInfo: "user info",
        }, sourceOrigin);
        break;
    }
});

