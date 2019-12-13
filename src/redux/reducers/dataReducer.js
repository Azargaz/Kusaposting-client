import { 
    SET_KUSAPOSTS,
    LIKE_KUSAPOST, 
    UNLIKE_KUSAPOST, 
    LOADING_DATA,
    DELETE_KUSAPOST,
    POST_KUSAPOST,
    SET_KUSAPOST,
    SUBMIT_COMMENT
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
        case SET_KUSAPOST:
            return {
                ...state,
                kusapost: action.payload
            }
        case LIKE_KUSAPOST:
        case UNLIKE_KUSAPOST:
            index = state.kusaposts.findIndex((kusapost) => kusapost.kusapostId === action.payload.kusapostId);
            state.kusaposts[index] = action.payload;    
            if(state.kusapost.kusapostId === action.payload.kusapostId) {
                state.kusapost = action.payload;
            }
            return {
                ...state
            }
        case DELETE_KUSAPOST:
            index = state.kusaposts.findIndex((kusapost) => kusapost.kusapostId === action.payload);
            state.kusaposts.splice(index, 1);
            return {
                ...state
            }
        case POST_KUSAPOST:
            return {
                ...state,
                kusaposts: [
                    action.payload,
                    ...state.kusaposts
                ]
            }
        case SUBMIT_COMMENT:
            return {
                ...state,
                kusapost: {
                    ...state.kusapost,
                    comments: [action.payload, ...state.kusapost.comments]
                }
            }
        default:
            return state;
    }
};