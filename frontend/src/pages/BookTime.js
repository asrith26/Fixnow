import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, RefreshCw } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import Button from '../components/Button';
import FormInput from '../components/FormInput';

const BookTime = () => {
  const { bookingData, setTime, setAddress, setCity, setZipCode } = useBooking();
  const navigate = useNavigate();
  const [timeSlot, setTimeSlot] = useState('');
  const [localAddress, setLocalAddress] = useState('');
  const [localCity, setLocalCity] = useState('');
  const [localZipCode, setLocalZipCode] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const handleContinue = () => {
    if (timeSlot && localAddress && localCity && localZipCode) {
      setTime(timeSlot);
      setAddress(localAddress);
      setCity(localCity);
      setZipCode(localZipCode);
      console.log('BookTime: Setting time:', timeSlot, 'address:', localAddress, 'city:', localCity, 'zip:', localZipCode);
      navigate('/book-confirmation');
    }
  };

  const handleGetLocation = async () => {
    console.log('🔍 BookTime: Getting current location...');
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
      console.log('✅ BookTime: Location obtained:', locationData);

      // Reverse geocode to get address
      try {
        const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
        console.log('🔑 BookTime: Using API key:', apiKey ? 'Present' : 'Missing');

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`Geocoding API error: ${response.status}`);
        }

        const data = await response.json();
        console.log('📍 BookTime: Geocode response:', data);

        if (data.results && data.results[0]) {
          const addressComponents = data.results[0].address_components;
          const formattedAddress = data.results[0].formatted_address;

          // Extract city and zip code from address components
          let city = '';
          let zipCode = '';

          addressComponents.forEach(component => {
            if (component.types.includes('locality') || component.types.includes('administrative_area_level_2')) {
              city = component.long_name;
            }
            if (component.types.includes('postal_code')) {
              zipCode = component.short_name;
            }
          });

          setLocalAddress(formattedAddress);
          setLocalCity(city);
          setLocalZipCode(zipCode);
          console.log('🏠 BookTime: Address set to:', formattedAddress, 'City:', city, 'Zip:', zipCode);
        } else {
          console.warn('⚠️ BookTime: No address found for coordinates');
          setLocalAddress(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        }
      } catch (geocodeError) {
        console.error('❌ Error reverse geocoding:', geocodeError);
        setLocalAddress(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
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

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">
            Step 2 of 3
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            When & Where?
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Select your preferred time and provide the service location.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Preferred time slot
            </label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="appearance-none block w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Select a time slot</option>
              <option value="Morning (8am - 12pm)">Morning (8am - 12pm)</option>
              <option value="Afternoon (12pm - 4pm)">Afternoon (12pm - 4pm)</option>
              <option value="Evening (4pm - 8pm)">Evening (4pm - 8pm)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Address
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-grow">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={localAddress}
                  onChange={(e) => setLocalAddress(e.target.value)}
                  placeholder="e.g., 123 Main St"
                  className="block w-full pl-10 pr-4 py-3 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <button
                onClick={handleGetLocation}
                disabled={isLoadingLocation}
                className="flex-shrink-0 p-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors disabled:opacity-50"
                title="Use my current location"
              >
                {isLoadingLocation ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <MapPin className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                City
              </label>
              <input
                type="text"
                value={localCity}
                onChange={(e) => setLocalCity(e.target.value)}
                placeholder="e.g., Tenali"
                className="block w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Zip Code
              </label>
              <input
                type="text"
                value={localZipCode}
                onChange={(e) => setLocalZipCode(e.target.value)}
                placeholder="e.g., 522201"
                className="block w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center">
            <button
              onClick={() => navigate('/find-pro')}
              className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
            >
              Back
            </button>
            <Button
              onClick={handleContinue}
              disabled={!timeSlot || !localAddress || !localCity || !localZipCode}
              className="w-full md:w-auto"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTime;
