mapboxgl.accessToken = mapBoxToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
    center: [-74.5 , 40], // starting position [lng, lat]
    zoom: 10 // starting zoom
});