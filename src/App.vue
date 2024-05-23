<template>
  <SearchInput class="search-input" @input="handleInput" />
  <SearchResult
    v-for="(result, index) in results"
    :key="`search-result${index}`"
    :name="result.display_name"
    :lat="result.lat"
    :lon="result.lon"
    class="search_result"
  />
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import API, { NominatimResponse } from './api'
import SearchInput from './components/SearchInput.vue'
import SearchResult from './components/SearchResult.vue'

const api = new API()
provide('api', api)

const results = ref<NominatimResponse[]>([])

const handleInput = async (query: string) => {
  try {
    const searchResults = await api.search(query)
    results.value = searchResults
    console.log(searchResults)
  } catch (ex: any) {
    console.log(ex)
  }
}
</script>

<style scoped lang="scss">
.search-input {
  margin-bottom: 32px;
}

.search-result {
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 32px;
  }
}
</style>
