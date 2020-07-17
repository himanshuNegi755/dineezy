//initial state
const initState = {
    items: []
}


const itemOrderedReducer = (state = initState, action) => {
    //console.log(action.payload)
    switch (action.type) {
        case 'ADD_ITEM':
            console.log('item added', action.payload)
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case 'DELETE_ITEM':
            let newItems = state.items.filter(post => {
                return action.payload !== post.itemName
            });
            return {
                ...state,
                items: newItems
            }
        default :
            return state;
    }
}


export default itemOrderedReducer;