<script setup>
import { ref } from 'vue'
import { useLocationsStore } from './stores/locationsStore'
import LocationSearch from './components/LocationSearch.vue'
import SavedLocations from './components/SavedLocations.vue'
import WeatherDisplay from './components/WeatherDisplay.vue'

const locationsStore = useLocationsStore()

const currentLocation = ref(locationsStore.savedLocations[0] || null)

function handleSelectLocation(location) {
  currentLocation.value = location
  locationsStore.addLocation(location)

  console.log('the location is add succesfully..', location)
}
</script>
<template>
  <div class="app-container">
    <h1>Weatherwise</h1>
    <LocationSearch @select-location="handleSelectLocation" />
    <SavedLocations
      :locations="locationsStore.savedLocations"
      @select-location="handleSelectLocation"
    />

    <WeatherDisplay v-if="currentLocation" :location="currentLocation" />

    <!-- A nice welcome message if no location is selected yet -->
    <div v-else class="welcome-message">
      <h2>Welcome to WeatherWise!</h2>
      <p>Search for a city to get started, or select a saved location.</p>
    </div>
  </div>
</template>
<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}
pre {
  background-color: #eee;
  padding: 10px;
  border-radius: 8px;
  text-align: left;
}

.welcome-message {
  text-align: center;
  margin-top: 50px;
  color: #7f8c8d;
}
</style>
