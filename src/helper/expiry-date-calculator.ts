async function calculateExpirationDate(): Promise<Date> {
  const expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + 5); // Expiry in 1 hour
  return expirationDate;
}

export default calculateExpirationDate;
