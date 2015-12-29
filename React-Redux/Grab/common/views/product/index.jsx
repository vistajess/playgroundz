import React from 'react';

export default class ProductList extends React.Component {

  render() {
    console.log(this.props.products.collection.data.length)
    return this.props.products.collection.data.length
      ? this.props.products.collection.data.map(val => {
          return <div>
              Products Here
            </div>
        })
      : <div>WTF</div>
  }
}
