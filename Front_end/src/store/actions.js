

export const storeInforUser = (data) => {
    return {
        type: 'storeInforUser',
        payload: data
    }
}

export const clearInforUser = () => {
    return {
        type: 'clearInforUser',
    }
}

export const storeListRegistedEvent = (data) => {
    return {
        type: 'storeListRegistedEvent',
        payload: data
    }
}

export const clearListRegistedEvent = () => {
    return {
        type: 'clearListRegistedEvent',
    }
}

export const addRegistedEvent = (data) => {
    return {
        type: 'addRegistedEvent',
        payload: data
    }
}