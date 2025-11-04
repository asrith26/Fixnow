import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Calendar, Navigation, RefreshCw } from 'lucide-react';
import Button from '../components/Button';
import MapComponent from '../components/MapComponent';

const FindProfessionalsNearMe = () => {
  const [location, setLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const professionals = [
    {
      id: 1,
      name: "John's Plumbing",
      service: 'Plumbing',
      distance: '2.5 miles away',
      rating: 4,
      reviews: 124,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQLOVZd8fLaYEiHDEob_8XrxpaaAjlr6i_KKpa7glTxDI4dh4xyhV_NF0Zwk85jXGiNUNOYJ4LC7bU_KPZusXj0MTr7uUcZs2zyyJlSx02nooFI6qBg3UfrpIKk7piMFJXngknZSCknuvBSIgMad-8FJEQOzuVd4Ut7_IYms9l49MInGSWt3EGc6lUB1W352Apg-A5pAAyMdhLVEp66tbb1L7j25z_Y-_mnrQAmV7sc9sfRkPSIUNU3HZ0HpBxksfYazRoNTUttSCa',
      description: 'Expert plumbing services with 15+ years of experience'
    },
    {
      id: 2,
      name: 'Sparky Electricals',
      service: 'Electrical',
      distance: '3.1 miles away',
      rating: 5,
      reviews: 98,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpVNgmrQOLfqmuIgBNXud9FdRqIdAacpZgjYPCIofkdOnSMM_sIjB7Ip1d36gfFbsPiYRYXCEI3nVXUPk0L3tcWTPC9TuhMMfcb-zoXR1qm0PkoTpzf2vhnD2yxHx1B6bzo-bZVREg_Abm2nRMSZsIiqRZKPOK8zywDsosBCUtDrkh9MFUt3NWczLrnozbXvKzE6eR5-PgsXErIp6KsV4kcAmMP4DY2HpU4fwJr6G89tSy9MYn3qeVc4vI9dPd9FG9G5WRAxgfgZUm',
      description: 'Licensed electrician specializing in residential and commercial work'
    },
    {
      id: 3,
      name: 'Perfect Painters Co.',
      service: 'Painting',
      distance: '4.0 miles away',
      rating: 4.5,
      reviews: 150,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnO5O4OKPGVGJL7vYFH2D7cuZ_ZfWohY9z7tAnTfUmV4XvaHQ1kzYyCZqMVINRTYA0OBx5FM4x-oKPLy-AMguTg9nPi_cXCrnZgKAddBElNLnML0ip3MqqVY3T6Y6mqski9QXVU_hJAaCG9GNr_YOVPpsrqnHDcIB2yxoVyj0cmi9Br0DgmIN_Q6hEWWSGMoDCuFaKDIt1GOyr1YmNlpub2BtRaA7XLKWc-eKhEm7YY6zHdqxeOoya0EyvXjbD5UrA5V_Z1_SskJvn',
      description: 'Professional painting services for interior and exterior projects'
    }
  ];

  // Get current location
  const getCurrentLocation = async () => {
    console.log('🔍 FindProfessionalsNearMe: Getting current location...');
    setIsLoadingLocation(true);

    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      setIsLoadingLocation(false);
      return;
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 300000
        });
      });

      const { latitude, longitude } = position.coords;
      const locationData = { lat: latitude, lng: longitude };
      console.log('✅ FindProfessionalsNearMe: Location obtained:', locationData);

      setCurrentLocation(locationData);

      // Reverse geocode to get address
      try {
        const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
        console.log('🔑 FindProfessionalsNearMe: Using API key:', apiKey ? 'Present' : 'Missing');

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`Geocoding API error: ${response.status}`);
        }

        const data = await response.json();
        console.log('📍 FindProfessionalsNearMe: Geocode response:', data);

        if (data.results && data.results[0]) {
          setLocation(data.results[0].formatted_address);
          console.log('🏠 FindProfessionalsNearMe: Address set to:', data.results[0].formatted_address);
        } else {
          console.warn('⚠️ FindProfessionalsNearMe: No address found for coordinates');
          setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        }
      } catch (geocodeError) {
        console.error('❌ Error reverse geocoding:', geocodeError);
        setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
      }
    } catch (error) {
      console.error('❌ Error getting location:', error);

      let errorMessage = 'Unable to get your location. ';
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage += 'Please allow location access in your browser settings.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage += 'Location information is unavailable.';
          break;
        case error.TIMEOUT:
          errorMessage += 'Location request timed out. Please try again.';
          break;
        default:
          errorMessage += 'Please check your browser permissions and try again.';
      }

      alert(errorMessage);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleLocationSelect = async (locationData) => {
    console.log('FindProfessionalsNearMe: Location selected:', locationData);
    setCurrentLocation(locationData);

    // Reverse geocode the selected location
    try {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationData.lat},${locationData.lng}&key=${apiKey}`
      );
      const data = await response.json();
      console.log('FindProfessionalsNearMe: Reverse geocode response:', data);
      if (data.results && data.results[0]) {
        setLocation(data.results[0].formatted_address);
        console.log('FindProfessionalsNearMe: Address updated to:', data.results[0].formatted_address);
      }
    } catch (error) {
      console.error('Error reverse geocoding selected location:', error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <main className="flex-grow">
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Professionals Near You</h2>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Showing top-rated professionals in your area.</p>
            </div>

            <div className="mt-8 max-w-md mx-auto">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter your location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-16 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={getCurrentLocation}
                  disabled={isLoadingLocation}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-primary hover:text-primary/80 disabled:opacity-50"
                  title="Get current location"
                >
                  {isLoadingLocation ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <Navigation className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                Click the navigation icon to get your live location
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Find Professionals on Map</h3>
              <MapComponent
                onLocationSelect={handleLocationSelect}
                initialLocation={currentLocation}
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                Click on the map to select a different location or use the navigation button above to get your live location
              </p>
              {currentLocation && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="font-medium text-blue-900 dark:text-blue-100">Current Location</p>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Lat: {currentLocation.lat.toFixed(6)}, Lng: {currentLocation.lng.toFixed(6)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-8">
              {professionals.map((professional) => (
                <div key={professional.id} className="bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center gap-6">
                  <img
                    src={professional.image}
                    alt={professional.name}
                    className="w-full sm:w-48 h-48 sm:h-auto object-cover rounded-lg"
                  />
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{professional.name}</h3>
                    <p className="text-primary font-semibold">{professional.service}</p>
                    <p className="text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {professional.distance}
                    </p>
                    <div className="flex items-center mt-2">
                      {renderStars(professional.rating)}
                      <span className="ml-2 text-sm text-gray-500">({professional.reviews} reviews)</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">{professional.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <Button
                      onClick={() => window.location.href = '/book-date'}
                      className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors shadow-md"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
    </main>
  );
};

export default FindProfessionalsNearMe;
