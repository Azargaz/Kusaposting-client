import { 
    SET_KUSAPOSTS, 
    LOADING_DATA, 
    LIKE_KUSAPOST, 
    UNLIKE_KUSAPOST,
    DELETE_KUSAPOST
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

export const likeKusapost = (kusapostId) => dispatch => {
    axios.get(`/kusapost/${kusapostId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_KUSAPOST,
                payload: res.data
            });
        })
        .catch(err => console.error(err));
}

export const unlikeKusapost = (kusapostId) => dispatch => {
    axios.get(`/kusapost/${kusapostId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_KUSAPOST,
                payload: res.data
            });
        })
        .catch(err => console.error(err));
}

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