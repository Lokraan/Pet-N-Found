const http = require("http");

class MapQuest {
  constructor(apiKey) {
    this.apiKey = apiKey;

    this.urlBase = "http://open.mapquestapi.com/geocoding/v1/address";
    this.url = `${this.urlBase}?key=${this.apiKey}`;
  }

  getLatitudeLongitudeFromAddress(address, callback) {
    const query = `${this.url}&location=${address}`;

    http.get(query, (res) => {
      const { statusCode } = res;
      const contentType = res.headers['content-type'];

      let error;
      if (statusCode !== 200) {
        error = new Error(
          `MapQuest Request Failed.\n Status Code: ${statusCode}`
        );
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error(
          `MapQuest Invalid content-type.\n 
          Expected application/json but received ${contentType}`
        );
      }
      if (error) {
        console.error(error.message);
        // consume response data to free up memory
        res.resume();
        return callback(null);
      }

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        const parsedData = JSON.parse(rawData);
        const coordinates = parsedData.results[0].locations[0].latLng;

        console.log(coordinates);
        return callback(null, coordinates);
      });
    }).on('error', (e) => {
      console.error(`Geolocation query got error: ${e.message}`);
      callback(null);
    });
  }
}

module.exports = {
  MapQuest: MapQuest
}
