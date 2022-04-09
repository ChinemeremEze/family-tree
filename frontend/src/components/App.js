import React from 'react';
import Signup from './Auth/Signup';
import styled from "styled-components"
import Home from "./Main/Home";
// import Login from './Auth/Login';
// import ForgotPassword from './Auth/ForgotPassword'
// import {Container} from 'react-bootstrap'
// import Dashboard from './Dashboard';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

const App = () => {
  const { currentUser } = useAuth()
  return (
    <Wrapper>
      <Router>
        {/* <NavBar/> */}
        {/* <Container className="d-flex  justify-content-center" 
          style ={{minHeight: "100vh"}}> */}
            <div>
              
                <Switch>
                   <Route exact path= "/" component={Home}/>
                  {/*<Route path= "/about" component={About}/>
                  <Route path="/contact" component={Contact}/>
                  <Route path="/insights" component={Insights}/>
                  <PrivateRoute path="/dashboard" component={Dashboard} />
                  <PrivateRoute  path= "/transaction/:transactionId" component={Transaction}/>
                  <PrivateRoute  path= "/update-profile" component={UpdateProfile}/> */}
                { !currentUser &&
                    <div>
                      <Route path="/signup" component={Signup}/>
                      {/* <Route path="/login" component={Login}/>
                      <Route path="/forgot-password" component={ForgotPassword}/> */}
                    </div>
                }
                </Switch>
            </div>
        {/* </Container> */}
        {/* <Footer/> */}
      </Router>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #f5f5f5;
`;
export default App;
