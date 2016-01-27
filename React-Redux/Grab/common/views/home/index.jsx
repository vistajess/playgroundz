import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
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
    console.log('this.props.counter',this.props);
    return (
      <div>
        Clicks: {this.props.counter}
        <button onClick={this.handleClick}>Click!</button>
        <Button bsStyle="info" onClick={this.handleClick}>Click Button A</Button>
        <hr/>
        {this.renderProducts()}
      </div>
    );
  }

  handleClick() {
    this.props.actions.click();
  }

  renderProducts() {
    const { products } = this.props;
    if ( products.isFetchingProductsError ) {
      console.log('isFetchingProductsError');
      return <ProductError />;
    } else if ( products.isFetchingProducts ) {
      console.log('isFetchingProducts');
      return <ProductLoading />
    } else if ( !products.collection.data.length ) {
      console.log('ProductEmpty');
      return <ProductEmpty />;
    }

    return <ProductList products={this.props.products.collection.data} />
  }
}

const mapStateToProps = state => ({
  products: state.products,
  counter: state.counter
});
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ click, getProducts }, dispatch) });
export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
