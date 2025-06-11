
// Map interaction control - allows interaction only when clicked
jQuery(document).ready(function($){
  var mapInteractionEnabled = false;
  var mapElement = document.getElementById('map_canvas');
  
  // Function to disable map interactions
  function disableMapInteraction() {
    if (window.googleMap && mapInteractionEnabled) {
      window.googleMap.setOptions({
        scrollwheel: false,
        draggable: false,
        gestureHandling: 'none'
      });
      mapInteractionEnabled = false;
    }
  }
  
  // Function to enable map interactions
  function enableMapInteraction() {
    if (window.googleMap) {
      window.googleMap.setOptions({
        scrollwheel: true,
        draggable: true,
        gestureHandling: 'cooperative'
      });
      mapInteractionEnabled = true;
    }
  }
  
  // Add click event to enable interaction
  $(mapElement).on('click', function() {
    enableMapInteraction();
  });
  
  // Add mouseleave event to disable interaction when mouse leaves the map
  $(mapElement).on('mouseleave', function() {
    disableMapInteraction();
  });
  
  // Additional jQuery document ready functions
  // Adjust visual bullets sliders
  $('.swiper-pagination-bullet').html('');

  setTimeout(function() {
      $('a:contains("Free Google Reviews widget")').remove();
  }, 2500);
});

// Google Maps initialization
function initMap() {
    // The latitude and longitude to center the map (always required)
    var pocitosLatLng = new google.maps.LatLng(-34.916200, -56.1509800); // zingman pocitos
    var centroLatLng = new google.maps.LatLng(-34.905180, -56.196611); // zingman centro
    
    // Calculate center between the two points
    var centerLat = (pocitosLatLng.lat() + centroLatLng.lat()) / 2;
    var centerLng = (pocitosLatLng.lng() + centroLatLng.lng()) / 2;
    var mapCenter = new google.maps.LatLng(centerLat, centerLng);
    
    // Basic options for the map - initially with interactions disabled
    var mapOptions = {
        zoom: 14, // Zoom out a bit to show both locations
        scrollwheel: false, // Disable scrollwheel by default
        draggable: false, // Disable dragging by default
        gestureHandling: 'none', // Disable gestures by default
        center: mapCenter,
        mapTypeControl: false,
        streetViewControl: false, // Remove Street View control
        fullscreenControl: false, // Remove fullscreen control for cleaner interface
    };

    // Get map element
    var mapElement = document.getElementById('map_canvas');
    
    // Create map - make it globally accessible
    window.googleMap = new google.maps.Map(mapElement, mapOptions);
    var map = window.googleMap;

    // Pin image with proper size
    var image = {
        url: 'img/marker_blue_strong_oz.png'
    };

    // Add marker for Pocitos
    var markerPocitos = new google.maps.Marker({
        position: pocitosLatLng,
        map: map,
        icon: image,
        title: 'Odontología Zingman - Pocitos'
    });

    // Add marker for Centro
    var markerCentro = new google.maps.Marker({
        position: centroLatLng,
        map: map,
        icon: image,
        title: 'Odontología Zingman - Centro'
    });

    // Info windows content
    var contentPocitos = "<b>Odontología Zingman!</b><br/><strong>Roque Graseras 828</strong><br/><br/><a href='https://goo.gl/maps/xtq8bmCwL4jVKhWk9'>Llegar usando google maps</a>";
    var infowindowPocitos = new google.maps.InfoWindow({
        content: contentPocitos
    });

    var contentCentro = "<b>Odontología Zingman!</b><br/><strong>Colonia 922</strong><br/><br/><a href='https://goo.gl/maps/Vfto8eRL9Nvc5cdH6'>Llegar usando google maps</a>";
    var infowindowCentro = new google.maps.InfoWindow({
        content: contentCentro
    });

    // Add click listeners for both markers
    google.maps.event.addListener(markerPocitos, 'click', function () {
        infowindowCentro.close(); // Close other infowindow if open
        infowindowPocitos.open(map, this);
    });

    google.maps.event.addListener(markerCentro, 'click', function () {
        infowindowPocitos.close(); // Close other infowindow if open
        infowindowCentro.open(map, this);
    });

    // Adjust the map to fit both markers
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(pocitosLatLng);
    bounds.extend(centroLatLng);
    map.fitBounds(bounds);

    // Set a minimum zoom level
    google.maps.event.addListenerOnce(map, 'bounds_changed', function() {
        if (map.getZoom() > 15) {
            map.setZoom(15);
        }
    });
}

// Swiper slider configuration
var swiper2 = new Swiper('.swiper-container_promos', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: false,
    // autoplay: {
    //     delay: 3000,
    // },
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 4,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    },
});

// Start steps slider
$(window).scroll(function () {
    // $steps_offset = $('#target_steps').offset();
    // $doc_position = $(document).scrollTop();
    // if ($doc_position => $steps_offset) {
    //     swiper2.autoplay.start();
    // }
});
