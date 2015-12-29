import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { click } from '../../modules/counter';
import { getProducts } from '../../modules/products';
import ProductList from '../product';
import ProductLoading from '../product/components/ProductLoading';
import ProductEmpty from '../product/components/ProductEmpty';
import ProductError from '../product/components/ProductError';

class HomeView extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      click: PropTypes.func.isRequired,
      getProducts: PropTypes.func.isRequired
    }).isRequired,

    counter: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.handleClick = ::this.handleClick;
  }

  componentDidMount() {
    this.props.actions.getProducts();
  }

  render() {
    return (
      <div>
        Clicks: {this.props.counter}
        <button onClick={this.handleClick}>Click!</button>
        <hr/>
        {this.renderProducts()}
      </div>
    );
  }

  handleClick() {
    this.props.actions.click();
  }

  renderProducts() {
    const {
      products,
      isFetchingProducts,
      isFetchingProductsError
    } = this.props;
    console.log(this.props);
    if ( isFetchingProductsError ) {
      return <ProductError />;
    } else if ( isFetchingProducts ) {
      return <ProductLoading />
    } else if ( !products.collection.data.length ) {
      return <ProductEmpty />;
    }

    return <ProductList products={products} />
  }
}

const mapStateToProps = state => ({
  products: state.products
});
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ click, getProducts }, dispatch) });
export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
