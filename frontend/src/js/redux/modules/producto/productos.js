import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "producto",
    "producto",
    "ProductoForm",
    "/producto",
);

export default handleActions(reducers, initialState);