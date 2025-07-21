export const generateTemporaryPassword = (): string => {
    return Math.random().toString(36).slice(-8); // Generates an 8-character alphanumeric string
  };
  