function initMap() {
    
    const { Map, Marker } = google.maps

    const map = new Map(
        document.querySelector('#map'),
        {
            center: { lat: 40.392499, lng: -3.698214 },
            zoom: 10,
        }
    )

    new Marker({
        position: { lat: 40.392499, lng: -3.698214 },
        map
    })
}