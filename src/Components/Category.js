import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { showLoading, showError } from './Utilities';
import '../Styles/Product.scss';

export function Categories() {
  return (
    <div>
      <h1>Hello from Categories</h1>
    </div>
  )
};

const checkCategory = (category) => {
  let acceptedCategories = ["blush", "bronzer", "eyebrow", "eyeliner", "eyesshadow", "foundation", "lip_liner", "lipstick", "mascara", "nail_polish"]
  let ret = category.split(' ').join('_');

  console.log(ret)
  console.log(acceptedCategories.includes(ret));

  return acceptedCategories.includes(ret) ? ret : "Wrong Name of Category";
}

function Product(props) {
  console.log(props.src);
  return (
    <article className="Product">
      <div className="Product__name">{ props.name }</div>
      <img className="Product__image" src= { props.src } alt="" ></img>
    </article>
  )
}



export function Category() {
  let category = checkCategory(useParams().name);
  // let products;
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(null);


  // const fetchData = async function(category) {
  //   try {
  //     let response = await fetch("https://makeup-api.herokuapp.com/api/v1/products.json?product_type=" + category);
  //     response = await response.json();
  //     console.log(await response)
  //   }
  //   catch (err) {
  //     console.log(err)
  //   }
  // }

  // fetchData(category);
  // console.log(products)


  useEffect(() => {
    async function fetchData(category) {
      try {
        let response = await fetch("https://makeup-api.herokuapp.com/api/v1/products.json?product_type=" + category);
        response = await response.json();
        console.log("response: " + await response)
        const ret = await response.slice(0, 15).map((elem) => {
          return { name: elem.name, image: "https:" + elem.api_featured_image, price: elem.price + elem.price_sign, colors: elem.product_colors.map((elembis) => { return elembis.hex_value })}
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




  // const showProducts = () => {
  //   return(
  //     <div>
  //       <h1>Hello from { category } </h1>
  //     </div>
  //   )}

  const showProducts = () => {
    let ret = [];
    products.forEach((product) => {
      ret.push(<Product name={ product.name } src={ product.image } />)
    })
    return(
      <Fragment>
        { ret }
      </Fragment>
      // <div>
      //   <Product name={ products[0].name } src={ products[0].image } />
      // </div>
    )}

  return (
    <Fragment>
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
