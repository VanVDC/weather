const request = require("request");
const forecast = (city, callback) => {
  const url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&&units=imperial&appid=8826658fd065f3eb3e3a878f0efcca83";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.name +
          " is currently " +
          body.main.temp +
          " degress out and " +
          body.weather[0].description
      );
    }
  });
};

module.exports = forecast;
