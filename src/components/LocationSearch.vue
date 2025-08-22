<script setup>
import { ref, watch } from 'vue'

const searchResults = ref([])
const searchQuery = ref('')
const error = ref(null)
const apiKey = 'f764377eac280d889019ea87b28c6bab'

let serachTimeout = null

const emit = defineEmits(['select-location'])

async function getSerachResults() {
  searchResults.value = null
  searchQuery.value = []
  try {
    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery.value}&limit=5&appid=${apiKey}`
    const response = await fetch(apiUrl)
    const data = response.json()

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

watch(searchQuery, (query) => {
  clearTimeout(serachTimeout)
  if (query.trim === '') {
    searchResults.value = []
    error.value = null
    return
  }

  serachTimeout = setTimeout(() => {
    getSerachResults()
  }, 500)
})
</script>
