<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  location: {
    type: Object,
    required: true,
  },
})

// const weatherData = ref(null)
const isLoading = ref(false)
const error = ref(null)
const currentWeather = ref(null)
const forecast = ref(null)

const apiKey = 'f764377eac280d889019ea87b28c6bab'

const dailyForecast = computed(() => {
  if (!forecast.value) return []
  return forecast.value.list.filter((item) => {
    return item.dt_txt.includes('12:00:00')
  })
})

async function fetchWeather(lat, lon) {
  isLoading.value = true
  //   weatherData.value = null
  error.value = null
  currentWeather.value = null
  forecast.value = null
  try {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    const currentResponse = await fetch(currentWeatherUrl)
    if (!currentResponse.ok) throw new Error('Failed to fetch current weather.')
    currentWeather.value = await currentResponse.json()
    console.log('Current Weather:', currentWeather.value)

    // --- API Call 2: Get 5-Day Forecast ---
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    const forecastResponse = await fetch(forecastUrl)
    if (!forecastResponse.ok) throw new Error('Failed to fetch forecast.')
    forecast.value = await forecastResponse.json()
    console.log('Forecast:', forecast.value)
  } catch (err) {
    console.error(err)
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

watch(
  () => props.location,
  (newLocation) => {
    if (newLocation && newLocation.lat && newLocation.lon) {
      fetchWeather(newLocation.lat, newLocation.lon)
    }
  },
  { immediate: true },
)
</script>
<!-- src/components/WeatherDisplay.vue -->

<template>
  <div class="weather-display">
    <div v-if="isLoading">...</div>
    <div v-else-if="error">...</div>

    <!-- We check for 'currentWeather' now, not 'weatherData' -->
    <div v-else-if="currentWeather" class="weather-content">
      <div class="forecast">
        <h3 class="forecast-title">5-Day Forecast</h3>
        <div class="forecast-grid">
          <!-- Loop through our new computed property -->
          <div v-for="day in dailyForecast" :key="day.dt" class="forecast-card">
            <p class="forecast-day">
              {{ new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }) }}
            </p>
            <img
              :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`"
              :alt="day.weather[0].description"
            />
            <p class="forecast-temp">{{ Math.round(day.main.temp) }}&deg;C</p>
          </div>
        </div>
      </div>
      <h2>Current Weather in {{ location.name }}</h2>

      <div class="current-weather">
        <!-- Update all references from 'weatherData' to 'currentWeather' -->
        <img
          :src="`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`"
          :alt="currentWeather.weather[0].description"
        />
        <div class="temp">{{ Math.round(currentWeather.main.temp) }}&deg;C</div>
        <div class="description">{{ currentWeather.weather[0].main }}</div>
      </div>

      <!-- We will add the forecast display in our very last step -->
    </div>
  </div>
</template>

<style scoped>
.forecast {
  margin-top: 40px;
  border-top: 1px solid #eee;
  padding-top: 30px;
}
.forecast-title {
  text-align: center;
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
}
.forecast-grid {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}
.forecast-card {
  flex: 1;
  text-align: center;
  padding: 15px 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
}
.forecast-day {
  font-weight: bold;
  margin: 0 0 10px 0;
}
.forecast-temp {
  font-size: 1.2rem;
  margin: 10px 0 0 0;
}
.weather-display {
  margin-top: 40px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
.feedback {
  text-align: center;
  font-size: 1.2rem;
  padding: 40px;
}
.error {
  color: #d9534f;
}
.weather-content h2 {
  text-align: center;
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 30px;
}
.current-weather {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.weather-icon {
  width: 100px;
  height: 100px;
}
.temp {
  font-size: 4rem;
  font-weight: bold;
  color: #34495e;
}
.description {
  font-size: 1.2rem;
  color: #7f8c8d;
  text-transform: capitalize;
}
</style>
