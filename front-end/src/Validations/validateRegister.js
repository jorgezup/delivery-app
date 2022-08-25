function validate(name, email, password) {
  const emailRegex = /\S+@\S+\.\S+/;
  const MIN_PASSWORD_LENGTH = 6;
  const MIN_NAME_LENGTH = 12;

  if (name.length < MIN_NAME_LENGTH) {
    return 'nome deve conter no mínimo 12 caracteres';
  }
  if (!emailRegex.test(email)) return 'email invalido';
  if (password.length < MIN_PASSWORD_LENGTH) {
    return 'senha deve conter no mínimo 6 caracteres';
  }
  return '';
}

export default validate;
