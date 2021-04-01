import React, { Component } from 'react';
import Formulario from './Formulario';

class Compra extends Component{
    state={
        creacion: true,
    }

    componentWillMount = () => {
        const { leer, leerProducto, match } = this.props;
        const id = match.params.id;
        const idp = match.params.idp;

        if(id){
            this.setState({creacion:false});
            leer(id);
        }
        else if(idp){
            leerProducto(idp)
        }
    }

    actualizarProducto = (data) => {
        const { editar } = this.props;
        const id = data.id;
        editar (id, data);
    }

    render(){
        console.log("PROPS: ", this.props);
        const { crearCompra, crearCompra2, data, match } = this.props;
        const { creacion } = this.state;
        let funcionEnvio = creacion ? crearCompra : this.actualizarProducto;

        if(match.path=='/compra/crear/:idp'){
        funcionEnvio = creacion ? crearCompra : this.actualizarProducto;}
        else if(match.path=='/comprar/crear/:idp'){
        funcionEnvio = creacion ? crearCompra2 : this.actualizarProducto;}

        return (
            <React.Fragment>
                <Formulario
                    crear={creacion}
                    onSubmit={funcionEnvio}
                    valor={match.path}
                />
            </React.Fragment>
        )
    }
}

export default Compra;