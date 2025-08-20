import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'weather_app_locations'

export const useLocationsStore = defineStore('locations', () => {
  const savedLocations = ref(JSON.parse(localStorage.getItem(STORAGE_KEY)) || [])

  function addLocation(location) {
    const exists = savedLocations.value.some(
      (loc) => loc.lat === location.lat && loc.lon === location.lon,
    )

    if (!exists) {
      savedLocations.value.push(location)
    }
  }

  function removeLocation(location) {
    savedLocations.value = savedLocations.value.filter(
      (loc) => !(loc.lat === location.lat && loc.lon === location.lon),
    )
  }

  watch(
    savedLocations,
    (newLocations) => {
      console.log('Saved location changed, updating localStorage...')

      localStorage.setItem(STORAGE_kEY, JSON.stringify(newLocations))
    },
    { deep: true },
  )
  return {
    savedLocations,
    addLocation,
    removeLocation,
  }
})
