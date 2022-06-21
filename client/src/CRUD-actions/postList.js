import axios from '../storing/axiosConfig';

export const setPostList = (postList) => ({type: 'SET_POST_LIST', postList,});

export const getPostList = (filters) => async (dispatch) => {
    try {
        dispatch({type: 'GET_POST_LIST_REQUEST'});
        const response = await axios.get('/posts', {params: filters});
        dispatch(setPostList(response.data.map((post) => ({...post}))));
        dispatch({type: 'GET_POST_LIST_SUCCESS'});
    } catch (e) {
        dispatch({type: 'GET_POST_LIST_FAILURE', message: e.message, response: e.response,});
    }
};
