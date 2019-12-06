import { 
    SET_KUSAPOSTS,
    LIKE_KUSAPOST, 
    UNLIKE_KUSAPOST, 
    LOADING_DATA,
    DELETE_KUSAPOST
} from '../types';

const initialState = {
    kusaposts: [],
    kusapost: {},
    loading: false
};

export default function(state = initialState, action) {
    let index;
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
            index = state.kusaposts.findIndex((kusapost) => kusapost.kusapostId === action.payload.kusapostId);
            state.kusaposts[index] = action.payload;    
            return {
                ...state
            }
        case DELETE_KUSAPOST:
            index = state.kusaposts.findIndex((kusapost) => kusapost.kusapostId === action.payload);
            state.kusaposts.splice(index, 1);
            return {
                ...state
            }
        default:
            return state;
    }
};