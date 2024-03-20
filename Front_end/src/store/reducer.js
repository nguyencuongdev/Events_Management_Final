export const initialState = {
    currentUser: null,
    listRegistedEvent: []
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'storeInforUser':
            state.currentUser = action.payload;
            return state;
        case 'clearInforUser':
            state.currentUser = null;
            return state;
        case 'storeListRegistedEvent':
            state.listRegistedEvent = action.payload;
            return state;
        case 'clearListRegistedEvent':
            state.listRegistedEvent = [];
            return state;
        case 'addRegistedEvent':
            const newRegistedEvents = [...state.listRegistedEvent, action.payload];
            state.listRegistedEvent = newRegistedEvents;
            return state;
        default: console.log('Lỗi');
    }
}
export default reducer;