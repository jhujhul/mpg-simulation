export const average = (numberArray: number[]): number => {
  const sum = numberArray.reduce((sum, number) => number + sum, 0);
  return numberArray.length ? sum / numberArray.length : 0;
};
