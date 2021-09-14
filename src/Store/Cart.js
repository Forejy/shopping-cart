import { Fragment } from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from '../Store/Store';
import { Header } from '../Components/Header'


function Cart(props) {
  let cart = props.cart



  return(
    <Fragment>
      <Header />
      <article>

      </article>
    </Fragment>
  )
}


const ConnectCart = connect(mapStateToProps,mapDispatchToProps)(Cart);

export default ConnectCart;