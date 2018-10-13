const { OpenStreetMapProvider } = require('leaflet-geosearch')
const { db } = require("../config/db_conf")
const { to } = require("await-to-js")

module.exports = {
  helloWorld() {
    console.log("Hello World")
  },

  addReport(address, species, image, name, description, email, phone) {
    const query = `
      INSERT INTO lost_reports
      (address, species, image, name, description, email, phone)
      VALUES (?, ?, ?, ?, ?, ?, ?)`

     db.run(query, 
       [address, species, image, name, description, email, phone],
       (err, res) => {
        if(err)
          throw err
      }
    )
  },

  getLostReports(callback) {
    const query = "SELECT * FROM lost_reports"
    
    db.all(query, (err, res) => {
      if(err) 
        throw err

      callback(res)
    })
  },

  getLostReportsWithSpecies(species, callback) {
    const query = "SELECT * FROM lost_reports WHERE species = ?"

    db.all(query, [species], (err, res) => {
      if(err) 
        throw err

      callback(res)
    })
  },

  getLostReportsWithName(name, callback) {
    const query = "SELECT * FROM lost_reports WHERE name = ?"

    db.all(query, [species], (err, res) => {
      if(err) 
        throw err

      callback(res)
    })
  },

  async filterByDistanceFromLocation(rows, location, radius) {
    const res = []

    // setup
    const provider = new OpenStreetMapProvider()
    let results = await provider.search({ query: location })
    const lat1 = results.x
    const lat2 = results.y

    rows.forEach((row) => {
      results = await(provider.search({ query: row.address }))
      if(getDistanceFromLatLonInKm(lat1, lon1, results.x, results.y)) {
        res.push(row)
      }
    })

    return res
  },

  async getLostReportsInRadius(baseLocation, radius) {
    const rows = getLostReports(async (rows) => {
      return await filterByDistanceFromLocation(rows, baseLocation, radius)
    })

    return rows
  },

  async getLostReportsWithSpeciesInRadius(species, baseLocation, radius) {
    const rows = getLostReportsWithSpecies(species, async (rows) => {
      return await filterByDistanceFromLocation(rows, baseLocation, radius)
    })

    return rows
  },

  async getLostReportsWithNameInRadius(name, baseLocation, radius) {
    const rows = getLostReportsWithName(name, async (rows) => {
      return await filterByDistanceFromLocation(rows, baseLocation, radius)
    })

    return rows
  },

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  },

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
}
