export function scoreGuess(actualPrice: number, guess: number) {
  if (!Number.isFinite(guess) || guess <= 0) {
    return { accuracy: 0, points: 100 };
  }

  const difference = Math.abs(actualPrice - guess);
  const percentOff = difference / actualPrice;
  const accuracy = Math.max(0, Math.round((1 - percentOff) * 1000) / 10);

  if (difference === 0) return { accuracy: 100, points: 1000 };
  if (percentOff <= 0.05) return { accuracy, points: 750 };
  if (percentOff <= 0.1) return { accuracy, points: 500 };
  if (percentOff <= 0.2) return { accuracy, points: 250 };
  return { accuracy, points: 100 };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

export function formatPercent(value: number) {
  return `${value.toFixed(value % 1 === 0 ? 0 : 1)}%`;
}
