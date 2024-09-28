export const getFutureDate = (daysInFuture: number, startDate: Date = new Date()): Date => {
  return new Date(startDate.getTime() + 1000 * 60 * 60 * 24 * daysInFuture);
};
