//const initState = {}

const authReducer = (state = null, action) => {
    //console.log(action.payload)
    switch (action.type) {
        case 'GET_USER':
            console.log('user added', action.payload)
            return action.payload || false;
        default :
            return state;
    }
}


export default authReducer;