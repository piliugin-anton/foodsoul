<template>
  <input type="text" class="input" @keyup="onInput" />
</template>

<script setup lang="ts">
import { debounce } from '../helpers'

const emit = defineEmits<{
  (e: 'input', query: string): void
}>()

const onInput = debounce((event: Event) => {
  const input = event.target as HTMLInputElement
  emit('input', input.value)
})

</script>

<style scoped lang="scss">
.input {
  padding: 8px;
}
</style>
