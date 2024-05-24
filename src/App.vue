<template>
  <SearchInput class="search-input" @input="handleInput" />
  <div class="message">
    <p v-if="isLoading">Идёт загрузка...</p>
    <p v-else-if="error" class="error-retry">
      <span class="error-retry__error">{{ error }}</span>

      <a href="#" class="error-retry__retry" @click="() => handleInput(lastQuery)">
        Повторить?
      </a>
    </p>
    <p v-if="isQueryEmpty">Введите в поле ваш запрос.</p>
    <p v-else-if="!isLoading && !results.length && !error">Нет результатов.</p>
  </div>
  <SearchResult
    v-if="results.length"
    v-for="(result, index) in results"
    :key="`search-result${index}`"
    :name="result.display_name"
    :lat="result.lat"
    :lon="result.lon"
    class="search_result"
  />
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import API, { NominatimResponse } from './api'
import { SnackBarMessage } from './helpers'
import SearchInput from './components/SearchInput.vue'
import SearchResult from './components/SearchResult.vue'

const api = inject('api') as API
const snackbar = inject('snackbar') as SnackBarMessage

const results = ref<NominatimResponse[]>([])
const isLoading = ref<boolean>(false)
const isQueryEmpty = ref<boolean>(true)
const error = ref<string>('')
const lastQuery = ref<string>('')

const handleInput = async (query: string) => {
  lastQuery.value = query

  if (query) {
    isQueryEmpty.value = false
  } else {
    isQueryEmpty.value = true

    return
  }

  isLoading.value = true

  try {
    const searchResults = await api.search(query)
    if (!searchResults.error) {
      error.value = ''
      results.value = searchResults.result
    } else {
      error.value = searchResults.error
      snackbar.error({ message: searchResults.error })
    }
    
  } catch (ex: any) {
    error.value = 'Ошибка при выполнении запроса.'

    snackbar.error({ message: error.value, actionText: 'Повторить?', onAction: () => handleInput(query) })
  }

  isLoading.value = false
}
</script>

<style scoped lang="scss">
.search-input {
  margin-bottom: 16px;
}

.message {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 48px;
  margin-bottom: 16px;
}

.search-result {
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 32px;
  }
}
</style>
