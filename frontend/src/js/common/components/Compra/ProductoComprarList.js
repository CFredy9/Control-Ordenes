import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';

import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";


class ListadoProductos extends Component {
    componentWillMount() {
        const { listarProductos, listarCarrito, totalCarrito } = this.props;
        listarProductos();
        listarCarrito();
        totalCarrito()
    }

    render() {
        const { listar, data, data2, loader, eliminar, onSortChange, onSearchChange, match, total, confirmarCompra, listarCarrito, listarProductos } = this.props;
        console.log("PROPS",this.props)
        return (
            <React.Fragment>
                <center><h3>Productos</h3></center>
                <div className='d-flex flex-row justify-content-between alig-items-center mb-2'>
                {/*<a 
                    href='/#/producto/crear'
                    className='btn btn-primary'
                    >
                        Crear Producto
                </a> */}

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
                        onPageChange={listarProductos}
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
                            Precio
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField='existencias'
                            dataSort
                        >
                            Existencias
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField='vendedor'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.user.first_name + ' ' + cell.user.last_name
                            }}
                        >
                            Vendedor
                        </TableHeaderColumn>

                        {match.url=='/comprar-producto' &&
                        <TableHeaderColumn
                            dataField='id'
                            dataAlign='center'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return <a className="px-2" style={{cursor: "pointer", color: "#008AE5"}}  href={`/#/comprar/crear/${cell}`}><i className="material-icons">shopping_cart</i></a>
                                }} 
                        >
                            Comprar
                        </TableHeaderColumn> }

                        {match.url=='/compra-producto' &&
                        <TableHeaderColumn
                            dataField='id'
                            dataAlign='center'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return <a className="px-2" style={{cursor: "pointer", color: "#008AE5"}}  href={`/#/compra/crear/${cell}`}><i className="material-icons">shopping_cart</i></a>
                                }} 
                        >
                            Comprar
                        </TableHeaderColumn> }
                    </Grid>
                }


                {(data ? data2.count : []) > 0 &&
                <center><h3>Carrito</h3></center> }
                {(data ? data2.count : []) > 0 &&
                    <Grid 
                        hover
                        striped
                        data={data2}
                        loading={loader}
                        onPageChange={listarCarrito}
                        onSortChange={onSortChange}
                    >
                        <TableHeaderColumn
                            isKey
                            dataField='producto'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.nombre;
                            }}
                        >
                            Nombre
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField='producto'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return 'Q.'+cell.precio;
                            }}
                        >
                            Precio
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField='cantidad'
                            dataSort
                        >
                            Cantidad
                        </TableHeaderColumn>
                        
                        <TableHeaderColumn
                            dataField='total'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return 'Q.'+cell;
                            }}
                        >
                            Subtotal
                        </TableHeaderColumn>
                        
                        <TableHeaderColumn
                            dataField='id'
                            dataAlign='center'
                            dataSort
                            dataFormat={standardActions({
                                eliminar: eliminar,
                            })}
                        >
                            Eliminar
                        </TableHeaderColumn>
                        
                    </Grid>
                }
                    {(data ? data2.count : []) > 0 &&
                        <center><h3><label>TOTAL: Q.{total ? total.total: [] } </label></h3>
                        <button
                        className={`btn btn-sm btn-primary`}
                        onClick={confirmarCompra}
                        >
                         Confirmar Compra
                        </button></center> }
            </React.Fragment>
        )
    }
}

export default ListadoProductos;