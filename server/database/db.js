const mongoose = require('mongoose');
const {MLAB_URL} = require('../../config.js');

mongoose.connect(MLAB_URL || 'mongod://localhost/MVP');

let weatherSchema = mongoose.Schema({
  // ALL DATA FROM conditions API request
  time: { type: Date, default: Date.now },
  cityInfo: {
    cityName: String,
    cityID: Number,
    state: String,
    country: String,
    zip: Number,
    tz_short: String,
    lat: Number,
    lon: Number,
    elevation: Number,
  },
  currentConditions: {
    timestampString: String,
    weather: String,
    temp_F: Number,
    feelsLike_F: Number,
    wind_mph: Number,
    wind_gust_mph: Number,
    icon: String,
    icon_url: String,
    forecastRainOneHr: Number,
    forecastRainToday: Number
  },
  forecast: {
    current: {
      title: String,
      description: String,
      icon: String,
      icon_url: String,
    },
    day1: {
      epoch: Number,
      date_string: String,
      high: Number,
      low: Number,
      conditions: String,
      icon: String,
      icon_url: String,
      rain_all_day: Number,
    },
    day2: {
      epoch: Number,
      date_string: String,
      high: Number,
      low: Number,
      conditions: String,
      icon: String,
      icon_url: String,
      rain_all_day: Number,
    },
    day3: {
      epoch: Number,
      date_string: String,
      high: Number,
      low: Number,
      conditions: String,
      icon: String,
      icon_url: String,
      rain_all_day: Number,
    }
  }
},
{ 
  timestamps: { createdAt: 'created_at'}
});

let WeatherRecord = mongoose.model('WeatherRecord', weatherSchema);

let save = (obj) => {
  return WeatherRecord.create(obj)
                 .catch((err) => {
                   console.log('console logging err DB-side!!', err);
                 });
}

let getRecords = (callback) => {
  return WeatherRecord.find({}).sort({date: 'ascending'}).limit(10).exec();
}

exports.getRecords = getRecords;
exports.save = save;
