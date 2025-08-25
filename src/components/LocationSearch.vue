<script setup>
import { ref, watch } from 'vue'

const searchResults = ref([])
const searchQuery = ref('')
const error = ref(null)
const apiKey = 'f764377eac280d889019ea87b28c6bab'

let searchTimeout = null

const emit = defineEmits(['select-location'])

async function getSearchResult() {
  error.value = null // Also good to reset the error
  searchResults.value = []
  try {
    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery.value}&limit=5&appid=${apiKey}`
    const response = await fetch(apiUrl)
    const data = await response.json()

    if (data.length > 0) {
      searchResults.value = data
    } else {
      error.value = 'No results found.'
    }
  } catch (err) {
    console.error('faliled to get search results:', err)
    error.value = 'Could not fetch locations.'
  }
}

function selectLocation(location) {
  emit('select-location', location)
  searchQuery.value = ''
  searchResults.value = []
}

watch(searchQuery, (query) => {
  clearTimeout(searchTimeout)
  if (query.trim() === '') {
    searchResults.value = []
    error.value = null
    return
  }

  searchTimeout = setTimeout(() => {
    getSearchResult()
  }, 500)
})
</script>
<template>
  <div class="search-container">
    <input
      type="text"
      placeholder="Search for a city..."
      class="search-input"
      v-model="searchQuery"
    />

    <p v-if="error" class="error-message">{{ error }}</p>

    <ul v-if="searchResults.length > 0" class="results-list">
      <li
        v-for="result in searchResults"
        :key="`${result.lat}-${result.lon}`"
        @click="selectLocation(result)"
        class="result-item"
      >
        {{ result.name }}, {{ result.state ? `${result.state}` : '' }}, {{ result.country }}
      </li>
    </ul>
  </div>
</template>
<style scoped>
.search-container {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 30px auto;
}
.search-input {
  width: 100%;
  padding: 12px 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  outline: none;
  box-sizing: border-box;
}
.error-message {
  color: #d9534f;
  padding-left: 20px;
  margin-top: 5px;
}
.results-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  list-style: none;
  margin-top: 5px;
  padding: 0;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  z-index: 10;
  max-height: 300px;
  overflow-y: auto;
}
.result-item {
  padding: 12px 20px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}
.result-item:last-child {
  border-bottom: none;
}
.result-item:hover {
  background-color: #f5f5f5;
}
</style>
