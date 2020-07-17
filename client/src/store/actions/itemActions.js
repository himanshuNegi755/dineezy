export const addItem = (itemObj) => {
    return {
        type: 'ADD_ITEM',
        payload: itemObj
        
    }
}

export const deleteItem = (itemName) => {
    return {
        type: 'DELETE_ITEM',
        payload: itemName
    }
}