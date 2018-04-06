const mongoose = require('mongoose');
mongoose.connect(process.env.MLAB_URL || 'mongod://localhost/MVP');

let weatherSchema = mongoose.Schema({
  cityInfo: [{
    cityName: String,
    cityID: Number,
    country: String,
    lat: Number,
    lon: Number,
  }],
  forecastData: {
    day1: {
      dt:
      dt_txt:
      weatherData: {
        rain:
        snow:
        temp_min:
        temp_max:
      }
    },
  }
});

let Record = mongoose.model('Document', weatherSchema);

let save = (data) => {

}

let getRecords = () => {

}

exports.getRecords = getRecords;
exports.save = save;