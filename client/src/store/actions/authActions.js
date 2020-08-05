import axios from "axios";

export const fetchUser = () => async dispatch => {
        // make async call to database
        const user = await axios.get(`${process.env.REACT_APP_BACKEND_API}/current_user`, {withCredentials: true});
        dispatch({type:'GET_USER', payload: user.data});
    };