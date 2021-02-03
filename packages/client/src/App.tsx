import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import HelloWorldView from "./views/HelloWorld";
import LoginView from "./views/Login";
import CreateAccountView from "./views/CreateAccount";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: "flex",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router> 
        <Switch>
          <Route path = "/createAccount"><CreateAccountView /></Route>
        </Switch>
        <Switch>
          <Route path = "/login"><LoginView /></Route>
        </Switch>
        <Switch>
          <Route path = "/" exact><HelloWorldView /></Route>
        </Switch>
      </Router>

      
    </div>
  );
}
