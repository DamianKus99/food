import React, { Component } from "react";
import Styles from "../../styles/ReservationForm.module.scss";
import VenueTableGrid from "../venue_tables/VenueTableGrid";
import moment from "moment";



class ReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: "",
      venueTable: "",
      start: moment().format().slice(0, 16),
      end: "",
      partySize: "",
      duration: "",
      reservationNotes: "",
      availableTables: [],
      showModal: false,
    };

    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handlePartySizeChange = this.handlePartySizeChange.bind(this);
    this.handleCustomerSelect = this.handleCustomerSelect.bind(this);
    this.handleVenueTableSelect = this.handleVenueTableSelect.bind(this);
    this.handleReservationNotesChange = this.handleReservationNotesChange.bind(
      this
    );
    this.selectCustomerById = this.selectCustomerById.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateEnd = this.updateEnd.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    this.updateEnd();
  }

  handleStartChange(event) {
    this.setState(
      {
        start: event.target.value,
      },
      () => this.updateEnd()
    );
  }

  handleDurationChange(event) {
    this.setState(
      {
        duration: event.target.value,
      },
      () => this.updateEnd()
    );
  }

  handlePartySizeChange(event) {
    this.setState(
      {
        partySize: event.target.value,
      },
      () => this.updateAvailableTables()
    );
  }

  handleCustomerSelect(event) {
    this.setState({
      customer: 1,
    });
  }

  handleVenueTableSelect(event) {
    this.setState({
      venueTable: event.target.value,
    });
    this.handleCustomerSelect()
  }

  handleReservationNotesChange(event) {
    this.setState({
      reservationNotes: event.target.value,
    });
  }

  selectCustomerById(id) {
    this.setState({
      customer: `${id}`,
    });
  }

  getCustomerById(id) {
    return this.props.customers.find((customer) => customer.id === id);
  }

  getVenueTableById(id) {
    return this.props.venueTables.find((venueTable) => venueTable.id === id);
  }

  addReservation() {
    const url = "https://pr-2022-api.herokuapp.com/reservations";
    const selectedCustomer = this.getCustomerById(
      parseInt(this.state.customer)
    );
    const selectedVenueTable = this.getVenueTableById(
      parseInt(this.state.venueTable)
    );
    const newReservation = {
      customer: selectedCustomer,
      venueTable: selectedVenueTable,
      start: this.state.start,
      end: this.state.end,
      partySize: this.state.partySize,
      reservationNotes: this.state.reservationNotes,
    };

    return fetch(url, {
      method: "POST",
      body: JSON.stringify(newReservation),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => this.props.onReservationSubmit());
  }

  handleSubmit(event) {
    event.preventDefault();
    alert("Reservation created!");
    this.addReservation();
    this.setState(
      {
        customer: "",
        venueTable: "",
        start: moment().format().slice(0, 16),
        end: "",
        partySize: "",
        duration: "",
        reservationNotes: "",
        availableTables: [],
        showModal: false,
      },
      () => this.updateEnd()
    );
  }

  updateEnd() {
    const startMoment = moment(this.state.start);
    const endMoment = startMoment.add(this.state.duration, "hours");
    const newEnd = endMoment.format().slice(0, 16);
    this.setState(
      {
        end: newEnd,
      },
      () => this.updateAvailableTables()
    );
  }

  updateAvailableTables() {
    const allTables = [...this.props.venueTables];
    const availableTables = allTables.filter((table) => {
      return (
        table.covers >= this.state.partySize && this.checkTableAvailable(table)
      );
    });
    this.setState({
      availableTables: availableTables,
      venueTable: "",
    });
  }

  checkTimeAvailable(reservation) {
    const startMoment = moment(this.state.start);
    const endMoment = moment(this.state.end);
    const reservationStart = moment(reservation.start);
    const reservationEnd = moment(reservation.end);
    if (
      startMoment.isBetween(reservationStart, reservationEnd, undefined, "[)")
    ) {
      return false;
    }
    if (
      endMoment.isBetween(reservationStart, reservationEnd, undefined, "(]")
    ) {
      return false;
    }
    return true;
  }

  checkTableAvailable(venueTable) {
    const reservations = venueTable.reservations;
    return reservations.every((reservation) =>
      this.checkTimeAvailable(reservation)
    );
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    const customerOptions = this.props.customers.map((customer) => {
      return (
        <option key={customer.id} value={customer.id}>
          {customer.firstName + " " + customer.lastName}
        </option>
      );
    });

    const venueTableOptions = this.state.availableTables.map((venueTable) => {
      return (
        <option key={venueTable.id} value={venueTable.id}>
          {`Stolik ${venueTable.id}: Miejsc ${venueTable.covers}`}
        </option>
      );
    });

    return (
      <>

        <form className={Styles.reservationForm} onSubmit={this.handleSubmit}>
          <div className={Styles.title}>Zarezerwuj stolik</div>
          <table className={Styles.tableForm}>
            <tbody>
              <tr>
                <th>
                  <label htmlFor="datetime">Data & Godzina</label>
                </th>
                <td>
                  <input
                    className={Styles.inputForm}
                    name="datetime"
                    type="datetime-local"
                    value={this.state.start}
                    onChange={this.handleStartChange}
                    required
                  />
                </td>
              </tr>

              <tr>
                <th>
                  <label htmlFor="duration">Czas trwania (godziny)</label>
                </th>
                <td>
                  <input
                    className={Styles.inputForm}
                    name="duration"
                    type="number"
                    value={this.state.duration}
                    onChange={this.handleDurationChange}
                    required
                    min="1"
                  />{" "}
                </td>
              </tr>

              <tr>
                <th>
                  <label htmlFor="party-size">Ilość miejsc</label>
                </th>
                <td>
                  <input
                    className={Styles.inputForm}
                    name="party-size"
                    type="number"
                    value={this.state.partySize}
                    onChange={this.handlePartySizeChange}
                    required
                    min="1"
                  />
                </td>
              </tr>
{/* 
              <tr>
                <th>
                  <label htmlFor="customer">Customer</label>
                </th>
                <td>
                  <select
                    name="customer"
                    value={this.state.customer}
                    onChange={this.handleCustomerSelect}
                    required
                  >
                    <option value="" disabled>
                      Please Select
                    </option>
                    {customerOptions}
                  </select>
                </td>
              </tr> */}

              <tr>
                <th>
                  <label htmlFor="venue-table">Numer stolika</label>
                </th>
                <td>
                  <select
                    name="venue-table"
                    value={this.state.venueTable}
                    onChange={this.handleVenueTableSelect}
                    required
                  >
                    <option value="" disabled>
                      Proszę o wybranie stolika
                    </option>
                    {venueTableOptions}
                  </select>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input className={Styles.inputForm} type="submit" value="Submit" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>

        <VenueTableGrid
          venueTables={this.props.venueTables}
          availableTables={this.state.availableTables}
        />
      </>
    );
  }
}

export default ReservationForm;
