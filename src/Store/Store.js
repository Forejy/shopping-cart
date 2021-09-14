import { createStore } from "redux";
import reducer from "./Reducer";



// convert object to string and store in localStorage
function saveToLocalStorage(state) {
  try {
    console.log("saveToLocalStorage, state: ", state);
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serialisedState);
    console.log("saveToLocalStorage, localStorage: ", localStorage);
  } catch (e) {
    console.warn(e);
  }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    console.log("loadFromLocalStorage, serialisedState: ", serialisedState);
    if (serialisedState === null) return undefined;
    console.log("loadFromLocalStorage, serialisedState parsed: ", JSON.parse(serialisedState));
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

// create our store from our rootReducers and use loadFromLocalStorage
// to overwrite any values that we already have saved
const store = createStore(reducer, loadFromLocalStorage());

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
store.subscribe(() => saveToLocalStorage(store.getState()));

  // read states from store
  const mapStateToProps = (state) => {
    return {
        cart:state.cart,
    }
  }

  //read actions from store
const mapDispatchToProps = (dispatch) =>{
    return {
      newPd: (pd) => dispatch({ type:'ADD_CART', pd:pd }),
      updatePd: (pd, newCount) => dispatch({ type:'UPDATE_CART', pd: pd, newCount: newCount }),
      removePd: (indx) => dispatch({ type: 'REMOVE_CART', indx: indx })
    }
}

export { store as default, mapStateToProps, mapDispatchToProps, loadFromLocalStorage, saveToLocalStorage}