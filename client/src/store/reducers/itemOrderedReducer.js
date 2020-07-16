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
        default :
            return state;
    }
}


export default itemOrderedReducer;