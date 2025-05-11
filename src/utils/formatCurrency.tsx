

export const formatUSD = (
  value: string | number,
  locale: string = 'en-US'
): string => {
 
  const normalized = 
    typeof value === 'string'
      ? value.replace(/[^0-9.-]/g, '')
      : String(value);

 
  const amount = parseFloat(normalized);

   if (isNaN(amount)) {
    return '$0.00';
  }

   return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};