<template>
  <SearchInput class="search-input" @input="handleInput" />
  <div class="loading">
    <span v-if="isLoading">Идёт загрузка...</span>
  </div>
  <p v-if="isQueryEmpty">Введите в поле ваш запрос.</p>
  <SearchResult
    v-if="results.length"
    v-for="(result, index) in results"
    :key="`search-result${index}`"
    :name="result.display_name"
    :lat="result.lat"
    :lon="result.lon"
    class="search_result"
  />
  <p v-else-if="!isLoading && !isQueryEmpty">Нет результатов.</p>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import Snackbar from 'awesome-snackbar'
import API, { NominatimResponse } from './api'
import SearchInput from './components/SearchInput.vue'
import SearchResult from './components/SearchResult.vue'

const api = inject('api') as API

const results = ref<NominatimResponse[]>([])
const isLoading = ref(false)
const isQueryEmpty = ref(true)

const handleInput = async (query: string) => {
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
      results.value = searchResults.result
    } else {
      new Snackbar(searchResults.error, {
        position: 'bottom-right',
        style: {
          container: [
            ['background-color', 'red'],
            ['border-radius', '5px']
          ],
          message: [
            ['color', '#eee'],
          ],
          bold: [
            ['font-weight', 'bold'],
          ]
        }
      })
    }
    
  } catch (ex: any) {
    new Snackbar('Ошибка при выполнении запроса', {
      position: 'bottom-right',
      style: {
        container: [
          ['background-color', 'red'],
          ['border-radius', '5px']
        ],
        message: [
          ['color', '#eee'],
        ],
        bold: [
          ['font-weight', 'bold'],
        ]
      }
    })
  }

  isLoading.value = false
}
</script>

<style scoped lang="scss">
.search-input {
  margin-bottom: 16px;
}

.loading {
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
