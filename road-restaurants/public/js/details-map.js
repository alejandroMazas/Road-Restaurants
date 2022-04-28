let map

function initMap() {

    if (document.querySelector('.single-restaurant')) {
        const string = document.location.pathname
        let id = string.slice(21, string.length)
        renderMap()
        getOnePlace(id)
    }
}

function getOnePlace(id) {

    axios.get(`/api/${id}/json`)
        // .then(response => console.log(response))
        .then(({ data }) => placeMarker(data))
        .catch(err => console.log(err))
}

function renderMap() {

    const { Map } = google.maps

    map = new Map(
        document.querySelector('#detailsMap'),
        {
            center: { lat: 40.392499, lng: -3.698214 },
            zoom: 10,
        }
    )
}

function placeMarker(place) {

    const { Marker } = google.maps

    const position = {
        lat: place.location.coordinates[1],
        lng: place.location.coordinates[0],
    }

    new Marker({ position, title: place.name, map })
}