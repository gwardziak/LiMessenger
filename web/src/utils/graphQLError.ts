export const graphQLError = (err: Error, message: string): string | null => {
  if (err.message.includes(message)) {
    return err.message.substr(9);
  }
  return null;
};
