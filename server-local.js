'use strict';
require('dotenv').config()

var port = process.env.PORT || 443;
const app = require('./src/server-production');

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})