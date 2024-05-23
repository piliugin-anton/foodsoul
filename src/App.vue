<template>
  <SearchInput class="search-input" @input="handleInput" />
  <SearchResult
    v-if="results.length"
    v-for="(result, index) in results"
    :key="`search-result${index}`"
    :name="result.display_name"
    :lat="result.lat"
    :lon="result.lon"
    class="search_result"
  />
  <p v-else-if="!isLoading">Нет результатов. Введите в поле ваш запрос.</p>
  <p v-if="isLoading">Идёт загрузка...</p>
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

const handleInput = async (query: string) => {
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
  margin-bottom: 32px;
}

.search-result {
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 32px;
  }
}
</style>
