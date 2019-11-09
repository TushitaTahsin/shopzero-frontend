import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Product from "../../components/Product/Product";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Axios from "axios";

class Products extends Component {
  state = {};

  componentDidMount() {
    this.props.onFetchProducts();
  }

  showProductHandler = id => {
    console.log(id);
    this.props.onShowProduct(id);
    // this.props.history.push("/productpage");
  };

  render() {
    let products = (
      <div>
        {this.props.products.map(product => (
          <Product
            key={product.id}
            name={product.name}
            price={product.sales_price}
            clicked={event => this.showProductHandler(product.id)}
          />
        ))}
      </div>
    );

    return products;
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchProducts: () => dispatch(actions.fetchProducts()),
    onShowProduct: id => dispatch(actions.showProduct(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Products, Axios));
