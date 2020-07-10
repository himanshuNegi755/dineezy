import axios from "axios";

export const fetchUser = () => async dispatch => {
        // make async call to database
        const user = await axios.get('http://localhost:5000/api/current_user', {withCredentials: true});
        dispatch({type:'GET_USER', payload: user.data});
    };