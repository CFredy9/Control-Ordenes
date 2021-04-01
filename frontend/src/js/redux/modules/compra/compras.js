import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import { api } from "api";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';

// ------------------------------------
// Constants
// ------------------------------------
const DATA = 'DATACOMPRA';
const DATA2 = 'DATACARRO';
const TOTAL = 'TOTALCARRITO'


export const setData = data => ({
    type: DATA,
    data,
});
export const setData2 = data2 => ({
    type: DATA2,
    data2,
});
export const setTotal = total => ({
    type: TOTAL,
    total,
});

/*export const { reducers, initialState, actions } = createReducer(
    "compra",
    "compra",
    "CompraForm",
    "/compra",
); */

const crearCompra = (data) => (dispatch) => {
    console.log('DATA', data)
    const formData={
        vendedor: data.vendedor,
        producto: data.producto,
        cantidad: data.cantidad,
        bandera: true,
        }
        api.post('/compra', formData).then(() => {
            dispatch(push("/compra-producto"));

            NotificationManager.success('Producto añadido al carrito, subtotal de: Q.'+data.cantidad*data.precio, 'Éxito', 8000);
        }).catch(() => {
            NotificationManager.error('Error en la compra', 'ERROR', 0);
        }).finally(() => {
        });
    };

const confirmarCompra = (data) => (dispatch) => {
    const formData={
        vendedor: 1,
        producto: 1,
        cantidad: 1,
        bandera: false,
        }
        console.log('Se está ejecuntando')
        api.post('/compra', formData).then(() => {
            dispatch(listarCarrito());
            dispatch(totalCarrito());

            NotificationManager.success('Compra realizada exitosamente', 'Éxito', 8000);
        }).catch(() => {
            NotificationManager.error('Error en la compra', 'ERROR', 0);
        }).finally(() => {
        });
    };

const crearCompra2 = (data) => (dispatch) => {
    console.log('DATA', data)
    const formData={
        vendedor: data.vendedor,
        producto: data.producto,
        cantidad: data.cantidad,
        bandera: true,
        }
        api.post('/compra', formData).then(() => {
            dispatch(push("/comprar-producto"));

            NotificationManager.success('Compra realizada, su total fue de: Q.'+data.cantidad*data.precio, 'Éxito', 8000);
        }).catch(() => {
            NotificationManager.error('Error en la compra', 'ERROR', 0);
        }).finally(() => {
        });
    };

const listarProductos = (page = 1) => (dispatch, getStore) => {
    const estado = getStore().producto;    
    let params = { page };
    params.ordering = estado.ordering;
    params.search = estado.search;
    api.get('/comprar_producto/', params).then(response => {
        dispatch(setData(response));
        /*dispatch(setPage(page));*/
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
        //dispatch(setLoader(false));
    });
}; 

const listarCarrito = (page = 1) => (dispatch, getStore) => {
    const estado = getStore().producto;    
    let params = { page };
    params.ordering = estado.ordering;
    params.search = estado.search;
    api.get('/compra/', params).then(response => {
        dispatch(setData2(response));
        /*dispatch(setPage(page));*/
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
        //dispatch(setLoader(false));
    });
}; 

const leer = id => (dispatch) => {
    api.get(`compra/${id}`).then((response) => {
        //response.nivel = {value: response.nivel.id , label: response.nivel.nombre_nivel}
        dispatch(initializeForm('CompraForm', response));
    }).catch(() => {
    }).finally(() => {
 });
}; 

const leerProducto = id => (dispatch) => {
    api.get(`producto/${id}`).then((response) => {
        console.log("Producto", response)
        response.producto_nombre = response.nombre;
        response.producto = response.id;
        response.existencias = response.existencias;
        response.precio = response.precio;
        response.vendedor_perfil = response.vendedor.user.first_name + ' ' + response.vendedor.user.last_name;
        response.vendedor = response.vendedor.id;
        dispatch(initializeForm('CompraForm', response));
    }).catch(() => {
    }).finally(() => {
 });
}; 

const eliminar = id => (dispatch) => {
    api.eliminar(`compra/${id}`).then(() => {
        dispatch(listarCarrito());
        dispatch(listarProductos());
        dispatch(totalCarrito());
        NotificationManager.success('Producto eliminado del carrito', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.success('Error en la transacción', 'Éxito', 3000);
    }).finally(() => {
    }); 
};

const totalCarrito = () => (dispatch, getStore) => {
    api.get('/compra/total_carrito').then(response => {
        //console.log("Pendiente", response);
        response.total_carrito = Math.round(response.total*100.0)/100.0;
        response.total = response.total_carrito.toFixed(2)
        dispatch(setTotal(response));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
    });
};

export const actions = {
    crearCompra,
    confirmarCompra,
    crearCompra2,
    listarProductos,
    listarCarrito,
    leer,
    leerProducto,
    eliminar,
    totalCarrito,
};

export const reducers = {
    [DATA]: (state, { data }) => {
        return {
            ...state,
            data, 
        };
    },
    [DATA2]: (state, { data2 }) => {
        return {
            ...state,
            data2, 
        };
    },
    [TOTAL]: (state, { total }) => {
        return {
            ...state,
            total, 
        };
    },
}

export const initialState = {
    loader: false,
    data: null,
    data2: null,
    total: null,
};

/*actions['crearCompra'] = crearCompra;*/

export default handleActions(reducers, initialState);