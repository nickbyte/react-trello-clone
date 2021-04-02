import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
  import HomePage from "./pages/HomePage";
  import BoardPage from "./pages/BoardPage";
  import NotFound from "./pages/NotFound";
  
  function App() {
    return(<Router>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/b/:id" >
          <BoardPage />
        </Route>
        <Route path="*">
              <NotFound />
        </Route>
      </Switch>
    </Router>)
  }
  export default App;
  