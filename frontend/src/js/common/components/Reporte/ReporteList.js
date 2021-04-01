import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';

import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";


class ListadoProductos extends Component {
    componentWillMount() {
        const { listar, totalVentas, promedioPrecios } = this.props;
        listar();
        totalVentas();
        promedioPrecios();
    }

    render() {
        const { listar, data, loader, eliminar, onSortChange, onSearchChange, total, promedio } = this.props;
        console.log("PROPS",this.props)
        return (
            <React.Fragment>
                <center><h3>Ventas por Producto</h3></center>
                
                {data &&
                    <Grid 
                        hover
                        striped
                        data={data}
                        loading={loader}
                        onPageChange={listar}
                        onSortChange={onSortChange}
                    >
                        <TableHeaderColumn
                            isKey
                            dataField='nombre'
                            dataSort
                        >
                            Nombre
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField='precio'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return 'Q.'+cell;
                            }}
                        >
                            Precio Actual
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField='existencias'
                            dataSort
                        >
                            Existencias
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField='vendido'
                            dataSort
                        >
                            Vendido
                        </TableHeaderColumn>
                        
                        <TableHeaderColumn
                            dataField='total_ventas'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return 'Q.'+cell;
                            }}
                        >
                            Total
                        </TableHeaderColumn>

                    </Grid>
                }

                        <center><h3><label>Ventas Totales: </label></h3></center>
                        <center><h3><label> Q.{total ? total.total: [] }  </label></h3></center>

                        <center><h3><label>Promedio de Precios: </label></h3></center>
                        <center><h3><label> Q.{promedio ? promedio.promedio: [] }  </label></h3></center>
            </React.Fragment>
        )
    }
}

export default ListadoProductos;