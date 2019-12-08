import { 
    SET_KUSAPOSTS, 
    LOADING_DATA, 
    LIKE_KUSAPOST, 
    UNLIKE_KUSAPOST,
    DELETE_KUSAPOST,
    SET_ERRORS,
    POST_KUSAPOST,
    CLEAR_ERRORS,
    LOADING_UI
} from '../types';

import axios from 'axios';

export const getKusaposts = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/kusaposts')
        .then(res => {
            dispatch({
                type: SET_KUSAPOSTS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: SET_KUSAPOSTS,
                payload: []
            });
            console.error(err)
        });
};

export const postKusapost = (newKusapost) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/kusapost', newKusapost)
        .then(res => {
            dispatch({
                type: POST_KUSAPOST,
                payload: res.data
            });
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

export const likeKusapost = (kusapostId) => dispatch => {
    axios.get(`/kusapost/${kusapostId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_KUSAPOST,
                payload: res.data
            });
        })
        .catch(err => console.error(err));
};

export const unlikeKusapost = (kusapostId) => dispatch => {
    axios.get(`/kusapost/${kusapostId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_KUSAPOST,
                payload: res.data
            });
        })
        .catch(err => console.error(err));
};

export const deleteKusapost = (kusapostId) => (dispatch) => {
    axios
        .delete(`/kusapost/${kusapostId}`)
        .then(() => {
            dispatch({
                type: DELETE_KUSAPOST,
                payload: kusapostId
            });
        })
        .catch(err => {
            console.error(err);
        })
};

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};