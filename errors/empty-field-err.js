class EmptyFieldError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.message = 'Поля email и password не должны быть пустыми.';
  }
}

module.exports = EmptyFieldError;
