exports.DATABASE_URL =
    process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    "mongodb://ladyjem:bestrong9@ds147821.mlab.com:47821/rethink";
exports.PORT = process.env.PORT || 8080;
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL||"mongodb://ladyjem:bestrong9@ds159926.mlab.com:59926/test-rethink";
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';