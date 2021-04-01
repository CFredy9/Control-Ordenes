import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import { api } from "api";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { floor } from 'lodash';

// ------------------------------------
// Constants
// ------------------------------------
const DATA = 'DATAREPORTE';
const TOTAL = 'TOTALREPORTE'
const PROMEDIO = 'PROMEDIOREPORTE'


export const setData = data => ({
    type: DATA,
    data,
});

export const setTotal = total => ({
    type: TOTAL,
    total,
});

export const setPromedio = promedio => ({
    type: PROMEDIO,
    promedio,
});



const listar = (page = 1) => (dispatch, getStore) => {
    const estado = getStore().producto;    
    let params = { page };
    params.ordering = estado.ordering;
    params.search = estado.search;
    api.get('/reportes/', params).then(response => {
        let x = 0;
        for (x = 0; x < response.results.length; x++) {
            if(response.results[x].vendido == null) {
                response.results[x].vendido = 0;
            }
            if(response.results[x].total_ventas == null) {
                response.results[x].total_ventas = 0;
            }
        }
        dispatch(setData(response));
        /*dispatch(setPage(page));*/
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
        //dispatch(setLoader(false));
    });
}; 

const totalVentas = () => (dispatch, getStore) => {
    api.get('/reportes/total_ventas').then(response => {
        //console.log("Pendiente", response);
        response.total_ventas = Math.round(response.total*100.0)/100.0;
        response.total = response.total_ventas.toFixed(2)
        dispatch(setTotal(response));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
    });
};

const promedioPrecios = () => (dispatch, getStore) => {
    api.get('/reportes/promedio_precios').then(response => {
        //console.log("Pendiente", response);
        response.promedio = Math.round(response.promedio*100.0)/100.0;
        response.promedio = response.promedio.toFixed(2)
        dispatch(setPromedio(response));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
    });
};


export const actions = {
    listar,
    totalVentas,
    promedioPrecios,
};

export const reducers = {
    [DATA]: (state, { data }) => {
        return {
            ...state,
            data, 
        };
    },
    [TOTAL]: (state, { total }) => {
        return {
            ...state,
            total, 
        };
    },
    [PROMEDIO]: (state, { promedio }) => {
        return {
            ...state,
            promedio, 
        };
    },
}

export const initialState = {
    loader: false,
    data: null,
    total: null,
    promedio: null,
};

/*actions['crearCompra'] = crearCompra;*/

export default handleActions(reducers, initialState);