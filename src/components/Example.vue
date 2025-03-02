<template>
  <content-container class="example">
    <div>
      <element-headline v-font="$getFont('Open Sans', 300, 'normal')">
        {{ headline }}
      </element-headline>
      <element-rich-text>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      </element-rich-text>
      <details>
        <summary>Critical</summary>
        <pre> {{ { isCritical: isCritical } }} </pre>
      </details>
      <details>
        <summary>Layout Data</summary>
        <pre>{{ layoutData }}</pre>
      </details>
    </div>
  </content-container>
</template>

<script setup lang="ts">
import {
  useBoosterCritical,
  useBoosterFonts,
  useLayoutContent
} from '#imports';
import { ContentContainer } from 'vue-semantic-structure';
import ElementHeadline from '@/components/element/Headline.vue';
import ElementRichText from '@/components/element/RichText.vue';

const { $getFont } = useBoosterFonts();
const { isCritical } = useBoosterCritical();

const { fetch } = useLayoutContent();
const layoutData = await fetch();

defineProps<{
  headline: string;
}>();
</script>

<style lang="postcss" scoped>
.example {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  height: 100svh;

  & pre {
    font-family: monospace;
  }
}
</style>
