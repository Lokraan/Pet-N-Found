const MAPBOX_TOKEN = 'pk.eyJ1Ijoic2llZ2VsemMiLCJhIjoiY2puN3A1emwxMTV6dDNxbWpqemVkbHVxNCJ9.Ns0UdWVAr_E7qGkqpry55g';


let lat = 50;
let long = -100;
let zoom = 8;

$(document).ready(() => {
   let petmap = L.map('petmap');
   petmap.setView([lat, long], zoom);

   let streets = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
         attribution: '&copy MapBox',
         accessToken: MAPBOX_TOKEN,
         id: 'mapbox.streets',
         minZoom: 2,
         maxZoom: 10
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