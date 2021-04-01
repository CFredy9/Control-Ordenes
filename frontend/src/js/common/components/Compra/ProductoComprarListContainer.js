import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/compra/compras';
import ProductoList from './ProductoComprarList';

const ms2p = (state) => {
    return {
        ...state.compra,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ProductoList);