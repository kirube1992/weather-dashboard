<script setup>
import { ref } from 'vue'
import { useLocationsStore } from './stores/locationsStore'
import LocationSearch from './components/LocationSearch.vue'

const locationsStore = useLocationsStore()

const currentLocation = ref(null)

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
    <div v-if="currentLocation">
      <h2>current Location</h2>
      <pre>{{ currentLocation }}</pre>
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
</style>
