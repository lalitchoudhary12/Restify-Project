const axios = require('axios');

// Function to geocode location and country to get coordinates (latitude and longitude)
async function geocodeLocation(location, country,map_api_key) {
  try {
    const query = `${location}, ${country}`;
    const geocodeUrl = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(query)}&apiKey=${map_api_key}`;

    // Make the request to the Geocoding API
    const response = await axios.get(geocodeUrl);

    // Check if the response has data
    if (response.data.items.length > 0) {
      const locationData = response.data.items[0].position;
      const lat = locationData.lat;
      const lng = locationData.lng;
      return { lat, lng };
    } else {
      throw new Error('Location not found.');
    }
  } catch (error) {
    if(error.errno == -3008) {
      throw new Error("Pls check your internet connection");
    } else {
      throw error
    }
  }
}

module.exports = { geocodeLocation };
