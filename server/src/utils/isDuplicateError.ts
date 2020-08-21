export const isDuplicateError = (err: Error, column?: string): boolean => {
  if (column && err.message.endsWith(`UNIQUE constraint failed: ${column}`))
    return true;
  return false;
};
