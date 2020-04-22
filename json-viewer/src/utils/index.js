const getType = val => {
    const t = Object.prototype.toString.call(val);

    return t.replace(/^(\[object )|\]$/g, '').toLowerCase();
};


export {
    getType,
};