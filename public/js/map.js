const DEFAULT_ZOOM = 9;
const MIN_ZOOM = 4;
const MAX_ZOOM = 18;
const DEFAULT_LATITUDE = 50;
const DEFAULT_LONGITUDE = -100;

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

function distanceInMilesBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
  var earthRadiusMile = 3959;

  var dLat = degreesToRadians(lat2-lat1);
  var dLon = degreesToRadians(lon2-lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return earthRadiusMile * c;
}

$(document).ready(() => {
   $('#petmap').css('height', window.innerHeight + 'px');
   const petmap = L.map('petmap', {
      worldCopyJump: true // "the map tracks when you pan to another "copy" of the world and seamlessly jumps to the original one so that all overlays like markers and vector layers are still visible"
   });
   const sidebar = L.control.sidebar('sidebar').addTo(petmap);

   let zoom = DEFAULT_ZOOM;
   let lat = DEFAULT_LATITUDE;
   let lon = DEFAULT_LONGITUDE;
   $.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
      lat = data.geobyteslatitude;
      lon = data.geobyteslongitude;

      petmap.setView([lat, lon], zoom);
   }, () => {
      petmap.setView([lat, lon], zoom);
   });

   // console.log([lat, lon]); // Bug: variables 'lat' and 'lon' do not hold their values set in the getCurrentPosition callback, this log prints [50, -100]; Currently, this bug is mitigated by placing setView inside the callback with another in the else statement

   const streets = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '&copy OpenStreetMap',
         minZoom: MIN_ZOOM,
         maxZoom: MAX_ZOOM
      }
   );
   streets.addTo(petmap);

   const connection = new SocketConnection();
   connection.connect();

   const socket = connection.socket;
   socket.on('Lost Reports', reports => {
      console.log("Reports:", reports);

      reports.forEach((report) => {
         const marker = L.marker([report.latitude, report.longitude], {
            title: report.uuid,
            keyboard: false,
            riseOnHover: true
         });

         marker.bindPopup(
            `Pet's Name: ${report.name} | Species: ${report.species} 
            | Description: ${report.description} | Email: ${report.email} 
            | Phone: ${report.phone}`
         );

         marker.addTo(petmap).on("click", (event) => {
            const reportId = event.target.options.title;

            socket.emit("get_report", reportId);
         });
      });
   });

   socket.on("report", (report) => {
      $("#report-title").text(`Name: ${report.name}`);
      
      const distance = distanceInMilesBetweenEarthCoordinates(
         lat, lon, report.latitude, report.longitude);
      $("#report-distance").text(`Distance: ${distance.toFixed(1)} miles`);

      $("#report-author").text(`Author: ${report.user.username}`);
      $("#report-author").attr("href", `/user/${report.user.username}`);

      $("#report-description").text(report.description);
      sidebar.open();
   });
});
