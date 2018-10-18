const DEFAULT_ZOOM = 9;
const MIN_ZOOM = 4;
const MAX_ZOOM = 18;
const DEFAULT_LATITUDE = 50;
const DEFAULT_LONGITUDE = -100;

$(document).ready(() => {
   $('#petmap').css('height', window.innerHeight + 'px');
   const petmap = L.map('petmap', {
      worldCopyJump: true // "the map tracks when you pan to another "copy" of the world and seamlessly jumps to the original one so that all overlays like markers and vector layers are still visible"
   });

   let zoom = DEFAULT_ZOOM;
   let lat = DEFAULT_LATITUDE;
   let lon = DEFAULT_LONGITUDE;
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
         lat = pos.coords.latitude;
         lon = pos.coords.longitude;
         petmap.setView([lat, lon], zoom);
      }, () => {
         console.error('Failed: navigator.geolocation.getCurrentPosition()');
      });
   } else {
      petmap.setView([lat, lon], zoom);
   }
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
         const marker = L.marker([report.lat, report.lon], {
            title: report.name,
            keyboard: false,
            riseOnHover: true
         });

         marker.bindPopup(
            `Pet's Name: ${report.name} | Species: ${report.species} 
            | Description: ${report.description} | Email: ${report.email} 
            | Phone: ${report.phone}`
         );
         marker.addTo(petmap);
      });
   });
});