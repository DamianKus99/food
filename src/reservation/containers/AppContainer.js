import React, { Component } from "react";
import MainContainer from "./MainContainer";
import styles from '../../styles/Login.module.scss';
import "../styles/AppContainer.module.scss";
import Brands from "../../components/Brands";
import Navbar from "../../components/Navbar";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      venueTables: [],
      reservations: [],
    };

    this.fetchData = this.fetchData.bind(this);
  }

  fetchData() {
    const customersUrl = "https://pr-2022-api.herokuapp.com/customers";
    fetch(customersUrl)
      .then((res) => res.json())
      .then((data) => this.setState({ customers: data }))
      .catch((err) => console.error(err));

    const venueTablesUrl = "https://pr-2022-api.herokuapp.com/venue-tables";
    fetch(venueTablesUrl)
      .then((res) => res.json())
      .then((data) => this.setState({ venueTables: data }))
      .catch((err) => console.error(err));

    const reservationsUrl = "https://pr-2022-api.herokuapp.com/reservations";
    fetch(reservationsUrl)
      .then((res) => res.json())
      .then((data) => this.setState({ reservations: data }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className={styles.login}>
        <div className={styles.nav}>
          <Navbar />
        </div>

        <MainContainer
          customers={this.state.customers}
          venueTables={this.state.venueTables}
          onCustomerSubmit={this.fetchData}
          onReservationSubmit={this.fetchData}
        />
      </div>
    );
  }
}

export default AppContainer;
