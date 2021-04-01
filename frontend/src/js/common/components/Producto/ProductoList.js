import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';

import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";


class ListadoProductos extends Component {
    componentWillMount() {
        const { listar } = this.props;
        listar();
    }

    render() {
        const { listar, data, loader, eliminar, onSortChange, onSearchChange } = this.props;
        console.log("PROPS",this.props)
        return (
            <React.Fragment>
                <center><h3>Productos Registrados</h3></center>
                <div className='d-flex flex-row justify-content-between alig-items-center mb-2'>
                <a 
                    href='/#/producto/crear'
                    className='btn btn-primary'
                    >
                        Crear Producto
                    </a>

                <input 
                    className='form-control w-25'
                    placeholder='Buscar...'
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                </div>
                {data &&
                    <Grid 
                        hover
                        striped
                        data={data}
                        loading={loader}
                        onPageChange={listar}
                        onSortChange={onSortChange}
                        onSearchChange={onSearchChange}
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
                            Precio
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField='existencias'
                            dataSort
                        >
                            Existencias
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField='id'
                            dataAlign='center'
                            dataSort
                            dataFormat={standardActions({
                                editar: 'producto',
                                ver: 'producto', 
                                eliminar: eliminar,
                            })}
                        >
                            Acciones
                        </TableHeaderColumn>
                    </Grid>
                }
            </React.Fragment>
        )
    }
}

export default ListadoProductos;