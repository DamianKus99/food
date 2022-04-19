import React from "react";
import ErrorPage from "../components/ErrorPage";
import ReservationForm from "../components/reservations/ReservationForm";


import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const MainContainer = (props) => {
  return (
    <div className="main-container">
      <Router>
        <React.Fragment>
          <Switch>
            <Route
              exact
              render={() => {
                return (
                  <ReservationForm
                    customers={props.customers}
                    venueTables={props.venueTables}
                    onCustomerSubmit={props.onCustomerSubmit}
                    onReservationSubmit={props.onReservationSubmit}
                  />
                );
              }}
            />
            <Route component={ErrorPage} />
          </Switch>
        </React.Fragment>
      </Router>
    </div>
  );
};

export default MainContainer;
