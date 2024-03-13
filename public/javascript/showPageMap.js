mapboxgl.accessToken = mapBoxToken;

const campgroundObj = JSON.parse(campground);

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: campgroundObj.geometry.coordinates,
    zoom: 10
});

new mapboxgl.Marker()
    .setLngLat(campgroundObj.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campgroundObj.title}</h3><p>${campgroundObj.location}</p>`
            )
    )
    .addTo(map);