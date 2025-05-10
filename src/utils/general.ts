export const generateId = (prefix: string): string => {
  const randomId = Math.random().toString(36).substring(2, 9);
  return `${prefix}-${randomId}`;
};
