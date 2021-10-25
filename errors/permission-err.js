class NotPermissionError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.message = 'У вас нет разрешения на это дейтсвие.';
  }
}

module.exports = NotPermissionError;
