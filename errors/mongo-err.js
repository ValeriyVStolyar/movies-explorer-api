class MongoError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.message = 'Такой email уже существует.';
  }
}

module.exports = MongoError;
