<template>
  <SearchInput class="search-input" @input="handleInput" />
  <div class="message">
    <p v-if="isLoading">Идёт загрузка...</p>
    <p v-else-if="message" class="message">{{ message }}</p>
    <p v-else-if="!isLoading && !results.length">Нет результатов.</p>
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
const message = ref<string>('Введите в поле ваш запрос.')

const handleInput = async (query: string) => {
  if (!query) {
    message.value = 'Введите в поле ваш запрос.'

    return
  }

  isLoading.value = true

  try {
    const searchResults = await api.search(query)
    if (!searchResults.error) {
      message.value = `Найдено ${searchResults.result.length} элементов`
      results.value = searchResults.result
    } else {
      message.value = searchResults.error
      snackbar.error({ message: searchResults.error })
    }
    
  } catch (ex: any) {
    message.value = 'Ошибка при выполнении запроса'

    snackbar.error({ message: message.value, actionText: 'Повторить?', onAction: () => handleInput(query) })
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
  height: 32px;
  margin-bottom: 16px;
}

.search-result {
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 32px;
  }
}
</style>
