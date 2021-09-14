import { saveToLocalStorage, loadFromLocalStorage } from '../Store/Store'

const initialState = {
  cart: []
}

Object.assign(initialState, loadFromLocalStorage());

console.log("initialState: ", initialState)

const reducer = (state = initialState, action) => {
  const newState = { ... state}

  console.log("reducer, newState: ", newState)

  if (action.type === 'ADD_CART') {
    addNew(action.pd);
  } else if (action.type === 'UPDATE_CART') {
    updatePd(action.pd, action.newCount)
  } else { //REMOVE_CART
    removePd(action.index);
  }

  function addNew(pd) {
    console.log("add new pd: ", pd);
    const newItem = {
      count: 1,
      id: pd.id,
      name: pd.name
    }

    const newCart = [...newState.cart];
    newCart.push(newItem);
    newState.cart = newCart;

    console.log(newState.cart)
    saveToLocalStorage(newState);
  }

  function updatePd(indx, newCount) {
    console.log("updatePd, index/newCount", indx, "/", newCount);
    const newCart = [...newState.cart];
    newCart[indx].count = newCount;

    newState.cart = newCart;
    saveToLocalStorage(newState);

    console.log(newState.cart);
  }

  function removePd(indx) {
    console.log("removePd, indx: ", indx);
    const newCart = [...newState.cart];
    newCart.splice(indx, 1);
    newState.cart = newCart;
  }

  return newState;
}

export default reducer;