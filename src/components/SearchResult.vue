<template>
    <div class="search-result">
        <p class="search-result__name">
            Название: {{ props.name }}
        </p>
        <p class="search-result__geoposition">
            Широта: {{ props.lat }}, долгота: {{ props.lon }}
        </p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  lat: string
  lon: string
}>()

</script>

<style scoped lang="scss">
.search-result {
    border: 2px solid #ffffff;
    padding: 8px;

    &__name,
    &__geoposition {
        text-align: left;
        margin: 0;
    }
}
</style>