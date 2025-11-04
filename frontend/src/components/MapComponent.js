import React, { useState, useEffect, useRef } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { MapPin, Loader } from 'lucide-react';

const MapComponent = ({ onLocationSelect, initialLocation }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const mapRef = useRef(null);

  const render = (status) => {
    switch (status) {
      case Status.LOADING:
        return (
          <div className="flex items-center justify-center h-full">
            <Loader className="animate-spin w-8 h-8 text-primary" />
            <span className="ml-2 text-gray-600 dark:text-gray-400">Loading map...</span>
          </div>
        );
      case Status.FAILURE:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400">Failed to load map</p>
            </div>
          </div>
        );
      case Status.SUCCESS:
        return <Map onLocationSelect={onLocationSelect} initialLocation={initialLocation} />;
    }
  };

  return (
    <div className="w-full h-96">
      <Wrapper
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY_HERE"}
        render={render}
      />
    </div>
  );
};

const Map = ({ onLocationSelect, initialLocation }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    console.log('Map: Initializing map with location:', initialLocation);
    if (mapRef.current && !map) {
      const googleMap = new window.google.maps.Map(mapRef.current, {
        center: initialLocation || { lat: 28.6139, lng: 77.2090 },
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      setMap(googleMap);

      // Add marker for current location
      const newMarker = new window.google.maps.Marker({
        position: initialLocation || { lat: 28.6139, lng: 77.2090 },
        map: googleMap,
        title: 'Your Location',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="8" fill="#1193d4" stroke="white" stroke-width="2"/>
              <circle cx="12" cy="12" r="3" fill="white"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(24, 24),
        },
      });

      setMarker(newMarker);

      // Add click listener to update location
      googleMap.addListener('click', (event) => {
        const clickedLocation = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        console.log('Map: Location clicked:', clickedLocation);

        newMarker.setPosition(clickedLocation);
        if (onLocationSelect) {
          onLocationSelect(clickedLocation);
        }
      });
    }
  }, [initialLocation, onLocationSelect]);

  // Update marker position when initialLocation changes
  useEffect(() => {
    if (marker && initialLocation) {
      console.log('Map: Updating marker position to:', initialLocation);
      marker.setPosition(initialLocation);
      if (map) {
        map.setCenter(initialLocation);
      }
    }
  }, [initialLocation, marker, map]);

  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
};

export default MapComponent;
