

const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            console.log(state + 1)
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

export default counter;