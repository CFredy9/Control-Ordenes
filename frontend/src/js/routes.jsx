import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro} from './common/components/LoginRegister';
import Demo from './common/components/Demo/Demo';
import ProtectedRoute from './ProtectedRoute';
import PRoute from './PRoute';
import NotFound from './common/components/layout/NotFound/NotFound';

import ProductoCrearContainer from './common/components/Producto/ProductoCrearContainer';
import ProductoListContainer from './common/components/Producto/ProductoListContainer';

import ProductoComprarListContainer from './common/components/Compra/ProductoComprarListContainer';
import CompraCrearContainer from './common/components/Compra/CompraCrearContainer';

import ReporteListContainer from './common/components/Reporte/ReporteListContainer';

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';
require('../style/index.css');

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/registro" component={Registro} />
                <Route exact path="/login" component={Login} />
                <PRoute exact path="/" component={Demo} />

                <ProtectedRoute exact path="/user-profile" component={Profile} />
                <ProtectedRoute exact path="/home" component={Demo} />

                <ProtectedRoute exact path="/producto/crear" component={ProductoCrearContainer} />
                <ProtectedRoute exact path="/producto/:id" component={ProductoCrearContainer} />
                <ProtectedRoute exact path="/producto/:id/editar" component={ProductoCrearContainer} />
                <ProtectedRoute exact path="/producto" component={ProductoListContainer} />

                <ProtectedRoute exact path="/compra-producto" component={ProductoComprarListContainer} />
                <ProtectedRoute exact path="/compra/crear/:idp" component={CompraCrearContainer} />

                <PRoute exact path="/comprar-producto" component={ProductoComprarListContainer} />
                <PRoute exact path="/comprar/crear/:idp" component={CompraCrearContainer} />

                <ProtectedRoute exact path="/reportes" component={ReporteListContainer} />


                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
