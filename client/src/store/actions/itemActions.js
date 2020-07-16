export const addItem = (itemObj) => {
    return {
        type: 'ADD_ITEM',
        payload: itemObj
        
    }
}

export const deleteItem = (itemId) => {
    return {
        type: 'DELETE_ITEM',
        payload: itemId
    }
}