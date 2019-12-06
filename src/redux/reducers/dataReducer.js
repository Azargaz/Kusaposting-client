import { SET_KUSAPOSTS, LIKE_KUSAPOST, UNLIKE_KUSAPOST, LOADING_DATA } from '../types';

const initialState = {
    kusaposts: [],
    kusapost: {},
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_KUSAPOSTS:
            return {
                ...state,
                kusaposts: action.payload,
                loading: false
            }
        case LIKE_KUSAPOST:
        case UNLIKE_KUSAPOST:
            let index = state.kusaposts.findIndex((kusapost) => kusapost.kusapostId === action.payload.kusapostId);
            state.kusaposts[index] = action.payload;    
            return {
                ...state
            }
        default:
            return state;
    }
};