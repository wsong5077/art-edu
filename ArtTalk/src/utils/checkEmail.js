// Utility function to validate an email
export const validateEmail = (email) => {
    const emailRegex = /^$|^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.com$/;
    return emailRegex.test(email);
  };

// Utility function to handle email changes
export const handleEmailChange = (text, setEmail, setIsEmailValid) => {
    setEmail(text);
    setIsEmailValid(validateEmail(text)); // Update email validity state
};
