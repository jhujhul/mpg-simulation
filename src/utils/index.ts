export const average = (numberArray: number[]): number => {
  if (numberArray.length === 0) {
    return 0;
  }

  const sum = numberArray.reduce((sum, number) => number + sum, 0);

  return sum / numberArray.length;
};
