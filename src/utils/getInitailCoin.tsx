export const getCoinInitial = (name: string): string => {
  if (!name) return '';
  const trimmed = name.trim();
  return trimmed.charAt(0).toUpperCase();
};