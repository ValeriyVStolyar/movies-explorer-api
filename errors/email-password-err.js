class EmailOrPasswordError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.message = 'Неправильные почта или пароль.';
  }
}

module.exports = EmailOrPasswordError;
