const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

export { validateEmail };
