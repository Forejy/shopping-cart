import { useState, useEffect, Fragment } from 'react';
import { categoriesLinkNames, categoriesNames, showLoading, showError } from './Components/Utilities'
import Product from './Components/Category'
import { Header } from './Components/Header'
import './Home.scss';


function RowProducts(props) {
  let ret = [];
  props.products.forEach((product) => {
    ret.push(<Product product={ product } />)
  });

  return(
    <Fragment>
      <article className="HomeCategory">
        <h2 className="HomeCategory__Name">
          { props.name }
        </h2>
        <section className="RowProducts">
          { ret }
        </section>
      </article>
    </Fragment>
  )
}

function App() {
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const url = "https://makeup-api.herokuapp.com/api/v1/products.json?product_type="
        const links = categoriesLinkNames.map((category) =>  url + category );

        let promises =
        links.map(async link => {
          const json = (await (await fetch(link)).json());
          const aryObj = json.slice(0, 4).map((elem) => {return {id: elem.id, name: elem.name, image: "https:" + elem.api_featured_image, price: elem.price + elem.price_sign }})
          return aryObj;
        });
        const aryProducts = (await Promise.all(promises));

        setProductsByCategory(aryProducts);
        setIsLoading(false);
      }
      catch (err) {
        setIsLoading(false);
        setServerError(err);
        console.log(err)
      }
    }
    fetchData();
  }, [])

  const showHomeProducts = () => {
    let ret = [];
    productsByCategory.forEach((rowProducts, index) => {
      ret.push(<RowProducts name= { categoriesNames[index] } products={ rowProducts }  />)
    })
    return (
      <section className="HomePage">
        { ret }
      </section>
    );
  }

  return (
    <Fragment>
      <Header />
      {(
        isLoading &&
        <Fragment>
        { showLoading() }
        </Fragment>
      ) || (
        serverError &&
        <Fragment>
          showError(serverError)
        </Fragment>
      ) || (
        productsByCategory &&
        <Fragment>
          { showHomeProducts() }
        </Fragment>
      )}
    </Fragment>
  );
}

export default App;
