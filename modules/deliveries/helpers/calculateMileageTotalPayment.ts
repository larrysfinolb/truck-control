/**
 * Calculates the total payment for a mileage-based trip.
 *
 * @param miles - Total loaded miles driven.
 * @param ratePerMile - Monetary rate paid per loaded mile.
 * @param deadheadMiles - Total empty (deadhead) miles driven.
 * @param ratePerDeadheadMile - Monetary rate paid per deadhead mile.
 * @returns The calculated total payment.
 */
export const calculateMileageTotalPayment = (
  miles: number,
  ratePerMile: number,
  deadheadMiles: number,
  ratePerDeadheadMile: number
): number => {
  const total = miles * ratePerMile + deadheadMiles * ratePerDeadheadMile;

  return Math.round(total * 10000) / 10000;
};
