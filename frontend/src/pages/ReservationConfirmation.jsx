import React from "react";
import { Link } from "react-router-dom";

const ReservationConfirmation = ({ reservationData }) => {
  return (
    <div>
      <h1>Confirm Reservation</h1>
      <div>
        <p>Check-in Date: {reservationData.checkIn}</p>
        <p>Check-out Date: {reservationData.checkOut}</p>
        <p>Number of pets: {reservationData.petCount}</p>
        <p>Day Rate: {reservationData.ratePerDay}</p>
        <p>Pet Type: {reservationData.petType}</p>
        <p>Message: {reservationData.messageTxt}</p>
      </div>
      <div>
        <Link to="/reservations/submit">
          <button>Confirm</button>
        </Link>
        <Link to="/book">
          <button>Cancel</button>
        </Link>
      </div>
    </div>
  );
};

export default ReservationConfirmation;
