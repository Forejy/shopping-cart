import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { categoriesLinkNames, showLoading, showError } from './Utilities';
import { Header } from './Header';
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from '../Store/Store';

import '../Styles/Product.scss';


function Categories() {
  return (
    <div>
      <h1>Hello from Categories</h1>
    </div>
  )
};

const checkCategory = (category) => {
  let parsedCate = category.split(' ').join('_');

  return categoriesLinkNames.includes(parsedCate) ? parsedCate : "Wrong Name of Category";
}

function Product(props) {
  console.log("Product, props: ", props);
  if (props.product) {

    const product = props.product;
    // console.log("product", product);
    // console.log("product", props);
    const { name, image } = props.product;

    const cart = props.cart
    // console.log("product cart: ", cart);
    const indx = cart.findIndex((elem) =>  elem.id === product.id);
    const count = indx !== -1 ? cart[indx].count : 0;
    // if (product.id === 1035){console.log("product count: ",count);}
    const increment = count > 0 ? () => { props.updatePd(indx, (count + 1)) } : () => { props.newPd(product) };
    // if (product.id === 1035){console.log("product increment: ", increment);}
    const decrement = count > 0 ? ( count > 1 ? () => { props.updatePd(indx, (count - 1)) } : () => { props.removePd(indx) }) : null;
    // if (product.id === 1035){console.log("product increment: ", decrement);}

    return (
      <article className="Product">
        <div className="Product__Name">{ name }</div>
        <img className="Product__Image" src= { image } alt="" ></img>
        <section className="ProductIncrementation">
          <div className="ProductIncrementation__moreless" onClick= { increment } >+</div>
          <div  >{ count }</div>
          <div className="ProductIncrementation__moreless" onClick= { decrement } >-</div>
        </section>
      </article>
    )
  } else {
    return null
  }
}

function Category() {
  let category = checkCategory(useParams().name);
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(null);

  console.log("Category");

  useEffect(() => {
    async function fetchData(category) {
      try {
        console.log("Category, fetchdata");
        let response = await fetch("https://makeup-api.herokuapp.com/api/v1/products.json?product_type=" + category);
        response = await response.json();
        // await console.log("response: " + response)
        const ret = await response.slice(0, 15).map((elem) => {
          // console.log("id: ", elem)
          return { iden: elem.id, name: elem.name, image: "https:" + elem.api_featured_image, price: elem.price + elem.price_sign, colors: elem.product_colors.map((elembis) => { return elembis.hex_value })}
        })
        setProducts(ret);
        setIsLoading(false);
      }
      catch (err) {
        setIsLoading(false);
        setServerError(err);
        console.log(err)
      }
    }
    fetchData(category);
  }, [])

  if (products) {
    console.log(products);
  }

  const showProducts = () => {
    let ret = [];
    products.forEach((product) => {
      ret.push(<ConnectProduct product={ product } />)
    })
    return(
      <Fragment>
        { ret }
      </Fragment>
    )}

  return (
    <Fragment>
      <Header pageName = { category }/>
    {(
      isLoading &&
      <Fragment>
      { showLoading() }
      </Fragment>
    ) || (
      serverError && showError(serverError)
    ) || (
      products &&
      <section className="Category">
        { showProducts() }
      </section>
    )}
  </Fragment>
  )
}

const ConnectProduct = connect(mapStateToProps, mapDispatchToProps)(Product);

export { ConnectProduct as default,  Category, Categories};