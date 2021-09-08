import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import { Category, Categories } from "./Components/Category";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ App } />
        <Route exact path="/category/:name" component={ Category } />
        <Route exact path="/category/" component={ Categories } />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;