const mongoose = require('mongoose');
const app = require('./app');

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log('node running in port', process.env.APP_PORT);
    });
  });
