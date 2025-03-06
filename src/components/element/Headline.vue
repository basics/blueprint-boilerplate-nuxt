<template>
  <content-headline v-slot="context" v-font="$getFont('Open Sans')">
    <slot v-bind="context" />
  </content-headline>
</template>

<script setup lang="ts">
import { ContentHeadline } from 'vue-semantic-structure';
import { useBoosterFonts } from '#imports';
const { $getFont } = useBoosterFonts();

defineProps<{
  content?: string;
}>();
</script>

<style lang="postcss" scoped>
* {
  margin: 0;
}
</style>
