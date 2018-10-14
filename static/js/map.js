$(document).ready(() => {
   $('#petmap').css('height', window.innerHeight + 'px');
   const petmap = L.map('petmap');
   
   const lat = 50;  
   const long = -100;
   const zoom = 9;

   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
         lat = pos.coords.latitude;
         long = pos.coords.longitude;
      });
   }
   petmap.setView([lat, long], zoom);

   const streets = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
         attribution: '&copy OpenStreetMap',
         minZoom: 4,
         maxZoom: 18
      }
   );
   streets.addTo(petmap);

   const connection = new SocketConnection();
   connection.connect();

   const socket = connection.socket;
   socket.on('Lost Reports', reports => {
      console.log("reports:", reports);
      
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
