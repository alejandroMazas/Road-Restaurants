let map


function initMap() {

    if (document.querySelector('.single-restaurant')) {
        const string = document.location.pathname
        let id = string.slice(21, string.length)
        getOnePlace(id)
    }
}

function getOnePlace(id) {

    axios.get(`/api/${id}/json`)
        .then(({ data }) => placeMarker(data))
        .catch(err => console.log(err))
}

function renderMap(position) {

    const { Map } = google.maps

    map = new Map(
        document.querySelector('#detailsMap'),
        {
            center: { lat: position.lat, lng: position.lng },
            zoom: 10,
        }
    )
}

function placeMarker(place) {

    const { Marker } = google.maps

    const svgMarker = {
        path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
        fillColor: "blue",
        fillOpacity: 0.6,
        strokeWeight: 0,
        rotation: 0,
        scale: 2,
        anchor: new google.maps.Point(15, 30),
    };

    const position = {
        lat: place.location.coordinates[1],
        lng: place.location.coordinates[0],
    }

    renderMap(position)
    new Marker({ position, title: place.name, map, icon: svgMarker })

}