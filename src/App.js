import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Appointments from "./components/Appointments";

function App() {
  const [lang, setLang] = useState("es");

  return (
    <div className="App">
      <Navbar lang={lang} setLang={setLang} />
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/">
              <Register lang={lang} />
            </Route>
            <Route
              exact
              path="/app"
              render={(props) => <Appointments {...props} lang={lang} />}
            ></Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
