<script setup>
import { useLocationsStore } from '@/stores/locationsStore'
import { ref } from 'vue'

const locationStore = useLocationsStore()

const emit = defineEmits('select-location')

function selectLocation(location) {
  emit('select-location', location)
}

function removeLocation(location) {
  locationStore.removeLocation(location)
}

defineProps({
  locations: {
    type: Array,
    required: true,
  },
})
</script>
<template>
  <div class="saved-location">
    <h2 v-if="locations.length > 0">Saved Locations</h2>
    <p v-if="locations.length === 0" class="no-locations-msg">
      You have no saved location,Use the search to add one
    </p>
    <ul v-else class="location-list">
      <li
        v-for="location in locations"
        :key="`${location.lat}-${location.lon}`"
        class="location-item"
      >
        <span @click="selectLocation(location)" class="location-name"
          >{{ location.name }} {{ location.country }}</span
        >

        <button @click="removeLocation(location)" class="remove-btn">&times;</button>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.saved-locations {
  margin-top: 40px;
}
.saved-locations h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 15px;
}
.no-locations-msg {
  color: #888;
  font-style: italic;
}
.locations-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.location-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s;
}
.location-name {
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
}
.location-name:hover {
  color: #42b883; /* Vue Green */
}
.remove-btn {
  background-color: transparent;
  border: none;
  color: #e74c3c;
  font-size: 1.8rem;
  line-height: 1;
  padding: 0 5px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}
.remove-btn:hover {
  opacity: 1;
}
</style>
