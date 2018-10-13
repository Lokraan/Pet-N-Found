let lat = 50;
let long = -100;
let zoom = 8;

$(document).ready(() => {
   let connection = new SocketConnection();
   connection.connect();
   let socket = connection.socket;

   $('#petmap').css('height', window.innerHeight + 'px');
   let petmap = L.map('petmap');
   petmap.setView([lat, long], zoom);
   

   let streets = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
         attribution: '&copy OpenStreetMap',
         minZoom: 4,
         maxZoom: 18
      }
   );
   streets.addTo(petmap);
   let m = L.marker([50, -100], {
      title: 'a',
      keyboard: false,
      riseOnHover: true,
      color: 'red'
   }).bindPopup('a');
   m.addTo(petmap);
});
