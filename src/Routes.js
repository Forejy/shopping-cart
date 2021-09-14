import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Category, Categories } from "./Components/Category";
import { createStore } from 'redux';
import reducer from './Store/Reducer.js'
import Home from "./Home";
import Cart from "./Store/Cart";
import { Provider } from "react-redux";

// import loadState from './Store/Store'
// const persistedState = loadState();
// const store = createStore(
//   app,
//   persistedState
// );store.subscribe(() => {
//   saveState({
//     todos: store.getState().todos
//   });
// });









const store = createStore(reducer);





const Routes = () => {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/cart" component={ Cart } />
          <Route exact path="/category/:name" component={ Category } />
          <Route exact path="/category/" component={ Categories } />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default Routes;