import React from 'react';

export default class ProductList extends React.Component {

  render() {
    return this.props.products.length
      ? <div>
        {this.props.products.map(function(product,index) {
          return <div key={index}>{product.name}</div>
        })}
        </div>
      : <div>WTF</div>
  }
}
