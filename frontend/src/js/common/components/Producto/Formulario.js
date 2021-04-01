import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderCurrency, renderField, renderNumber } from '../Utils/renderField/renderField';

const required = value => (value || typeof value === 'number' ? undefined : 'Este campo es requerido')
const number = value =>
  value && isNaN(Number(value)) ? 'Tiene que ser un número' : undefined

class Formulario extends Component {
    render(){

        const { handleSubmit, crear } = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Editar Producto' : 'Registrar Producto';
        let disabled = false;
        if(crear ==  false && editar == false){
            disabled = true;
            titulo = 'Ver Producto';
        } 
    
    return(
        <form onSubmit={handleSubmit} className='formulario'>
            <center><h3>{titulo}</h3>
            <center><h6 className="h7">* Campos Requeridos</h6></center>
            <br></br>
            <label>* Nombre</label>
            <Field name='nombre' component={renderField} disabled={disabled} validate={required} />

            <label>* Precio</label>
            <Field name='precio' component={renderCurrency} disabled={disabled} validate={required} />

            <label>* Existencias</label>
            <Field name='existencias' component={renderField} disabled={disabled} validate={[required, number]} />
            
            <br></br>

            <div className=''>
                <a 
                    href='/#/producto'
                    className='btn btn-secondary btn-sm mr-2'
                    >
                        Cancelar
                    </a>

                {disabled == false && 
                    <button
                        className={`btn btn-sm ${editar ? 'btn-success' : 'btn-primary'}`}
                        type="submit"
                        >
                            {editar ? 'Actualizar' : 'Registrar'}
                        </button>
                            
                }
            </div>
            </center>
        </form>
    )
    }
}

export default reduxForm({
    form: 'ProductoForm'
})(Formulario)