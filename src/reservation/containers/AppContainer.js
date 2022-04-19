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
    const customersUrl = "http://localhost:8080/customers";
    fetch(customersUrl)
      .then((res) => res.json())
      .then((data) => this.setState({ customers: data }))
      .catch((err) => console.error(err));

    const venueTablesUrl = "http://localhost:8080/venue-tables";
    fetch(venueTablesUrl)
      .then((res) => res.json())
      .then((data) => this.setState({ venueTables: data }))
      .catch((err) => console.error(err));

    const reservationsUrl = "http://localhost:8080/reservations";
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
