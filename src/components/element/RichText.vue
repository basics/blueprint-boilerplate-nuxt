<template>
  <div
    v-font="[
      $getFont('Open Sans'),
      $getFont('Open Sans', 700, 'normal', {
        selector: 'strong'
      }),
      $getFont('Open Sans', 400, 'italic', {
        selector: 'em'
      }),
      $getFont('Open Sans', 700, 'italic', {
        selector: 'em strong, strong em'
      })
    ]"
    class="element-rich-text"
  >
    <slot v-if="$slots.default" name="default" :content="content" />
    <div v-else v-html="content" />
  </div>
</template>

<script setup lang="ts">
import { useBoosterFonts } from '#imports';
const { $getFont } = useBoosterFonts();

defineProps<{
  content?: string;
}>();
</script>
