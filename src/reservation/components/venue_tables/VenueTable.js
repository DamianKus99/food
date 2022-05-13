import React from "react";
import "../../styles/VenueTable.css";

const VenueTable = ({ venueTable, availableTables }) => {
  const checkAvailable = () => {
    if (availableTables.includes(venueTable)) {
      return "";
    }
    return " unavailable";
  };

  return (
    <div className={"venue-table" + checkAvailable()}>
      <p id="table-number">{`Stolik ${venueTable.id}`}</p>
      <p id="covers">{`Miejsc ${venueTable.covers}`}</p>
    </div>
  );
};

export default VenueTable;
