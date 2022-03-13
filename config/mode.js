const Prod = process.argv.includes("--production");
const Dev = !Prod;
exports.prod = Prod;
exports.dev = Dev;
