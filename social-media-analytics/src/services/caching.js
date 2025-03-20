const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 }); // 5 min cache

module.exports = cache;
