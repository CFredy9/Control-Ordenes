import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderField, renderNumber, renderCurrency } from '../Utils/renderField/renderField';

const required = value => (value || typeof value === 'number' ? undefined : 'Este campo es requerido')
const validate = values => {
    const errors = {}
    if (!values.cantidad) {
      errors.cantidad = 'Campo requerido'
    } else if (values.cantidad > values.existencias) {
      errors.cantidad = 'La cantidad no debe ser mayor que '+values.existencias
    }
    /*else if (isNaN(Number(values.cantidad))) {
      errors.cantidad = 'Tiene que ser un número' 
    }*/
    return errors
  }

class Formulario extends Component {
    render(){

        const { handleSubmit, crear, valor } = this.props;
        console.log('VALORES', this.props);
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Editar Compra' : 'Registrar Comprar';
        let disabled = false;
        let ocultar = true;
        if(crear ==  false && editar == false){
            disabled = true;
            titulo = 'Ver Compra';
        } 
    
    return(
        <form onSubmit={handleSubmit} className='formulario2'>
            <center><h3>{titulo}</h3>
            <center><h6 className="h7">* Campos Requeridos</h6></center>
            <br></br>
            <label>Vendedor</label>
            <Field name='vendedor_perfil' component={renderField} disabled={ocultar}  />
            <Field name='vendedor' component={renderField} type="hidden"   />

            <label>Producto</label>
            <Field name='producto_nombre' component={renderField} disabled={ocultar}  />
            <Field name='producto' component={renderField} type="hidden"  />

            <label>Precio</label>
            <Field name='precio' component={renderCurrency} disabled={ocultar}  />

            <label>* Cantidad</label>
            <Field name='cantidad' component={renderNumber} disabled={disabled}  />
            <Field name='existencias' component={renderField} type="hidden" />

            
            <br></br>

            <div className=''>
            {valor=='/compra/crear/:idp' &&
                <a 
                    href='/#/compra-producto'
                    className='btn btn-secondary btn-sm mr-2'
                    >
                        Cancelar
                    </a> }
            {valor=='/comprar/crear/:idp' &&
                <a 
                    href='/#/comprar-producto'
                    className='btn btn-secondary btn-sm mr-2'
                    >
                        Cancelar
                    </a> }

                {disabled == false && 
                    <button
                        className={`btn btn-sm ${editar ? 'btn-success' : 'btn-primary'}`}
                        type="submit"
                        >
                            {editar ? 'Actualizar' : 'Añadir al Carrito'}
                        </button>
                            
                }
            </div>
            </center>
        </form>
    )
    }
}

export default reduxForm({
    form: 'CompraForm',
    validate
})(Formulario)