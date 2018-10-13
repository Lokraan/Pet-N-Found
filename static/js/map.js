let lat = 50;  
let long = -100;
let zoom = 9;

$(document).ready(() => {
   let connection = new SocketConnection();
   connection.connect();
   let socket = connection.socket;
   let lostReports;
   socket.on('Lost Reports', reports => {
      lostReports = reports;
      for(let i = 0; i < lostReports.length; i++) {
         let r = lostReports[i];
         let m = L.marker([r.lat, r.lon], {
            title: r.name,
            keyboard: false,
            riseOnHover: true
         });
         m.bindPopup('Pet\'s Name: ' + r.name + ' | Species: ' + r.species + ' | Description: ' + r.description + ' | Email: ' + r.email + ' | Phone: ' + r.phone);
         m.addTo(petmap);
      }
      console.log(lostReports);
   });

   $('#petmap').css('height', window.innerHeight + 'px');
   let petmap = L.map('petmap');
   
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
         lat = pos.coords.latitude;
         long = pos.coords.longitude;
         petmap.setView([lat, long], zoom);
      });
   }

   let streets = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
         attribution: '&copy OpenStreetMap',
         minZoom: 4,
         maxZoom: 18
      }
   );
   streets.addTo(petmap);
});