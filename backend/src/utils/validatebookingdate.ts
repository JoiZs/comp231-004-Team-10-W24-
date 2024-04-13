export const validateBooking = (
  checkInDate: Date,
  checkOutDate: Date,
  availableStartDate: Date,
  availableEndDate: Date
) => {
  // Parse the dates
  let checkIn = new Date(checkInDate);
  let checkOut = new Date(checkOutDate);
  let startDate = new Date(availableStartDate);
  let endDate = new Date(availableEndDate);

  console.log(checkIn, checkInDate);
  console.log(checkOut, checkOutDate);
  console.log(startDate, availableStartDate);
  console.log(endDate, availableEndDate);
  console.log(checkIn < startDate);
  console.log(checkIn > endDate);
  console.log(checkOut <= checkIn);
  // Check if the check-in date is within the available period
  if (checkIn < startDate || checkIn > endDate) {
    return false;
  }

  // Check if the check-out date is after the check-in date
  if (checkOut <= checkIn) {
    return false;
  }

  // All validation passed
  return true;
};
