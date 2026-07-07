export function formatNumber(value = 0) {
  return new Intl.NumberFormat('en-IN').format(Number(value) || 0)
}

export function formatCurrency(value = 0) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)
}
