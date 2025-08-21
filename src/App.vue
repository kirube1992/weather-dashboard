<script setup>
import { useLocationsStore } from './stores/locationsStore'

const locationsStore = useLocationsStore()

function testAdd() {
  const newLocation = {
    name: 'Addis Ababa',
    lat: '51.50',
    lon: '-0.12',
    country: 'ET',
  }
  console.log('Adding addisAbaba...')
  locationsStore.addLocation(newLocation)
}

function testAddAnother() {
  const anotherLocation = {
    name: 'Tokyo',
    lat: 35.68,
    lon: 139.69,
    country: 'JP',
  }
  console.log('Adding Tokyo...')
  locationsStore.addLocation(anotherLocation)
}

function testRemove() {
  const locationToRemove = {
    name: 'AddisAbaba',
    lat: '51.50',
    lon: '-0.12',
    country: 'ET',
  }
  console.log('Removing Addis Ababa...')
  // Actually call the store's remove function
  locationsStore.removeLocation(locationToRemove)
}
</script>

<template>
  <div>
    <h1>Weather Dashboard - Store Test</h1>
    <div class="buttons">
      <button @click="testAdd">Add London</button>
      <button @click="testAddAnother">Add Tokyo</button>
      <button @click="testRemove">Remove London</button>
    </div>

    <h2>Current Saved Locations:</h2>
    <!-- This will display the current state of our store -->
    <pre>{{ locationsStore.savedLocations }}</pre>
  </div>
</template>

<style scoped>
.buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
pre {
  background-color: #eee;
  padding: 10px;
  border-radius: 8px;
}
</style>
