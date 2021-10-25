class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.message = 'Невалидный id.';
  }
}

module.exports = ValidationError;
