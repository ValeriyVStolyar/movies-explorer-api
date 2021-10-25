class NotExistRoutError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.message = 'Был запрошен несуществующий роут.';
  }
}

module.exports = NotExistRoutError;
