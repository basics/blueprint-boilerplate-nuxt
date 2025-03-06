<template>
  <content-container class="example">
    <div>
      <element-headline :content="headline" />
      <element-rich-text>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      </element-rich-text>
      <div class="image">
        <booster-picture v-if="picture" v-bind="picture" />
      </div>
      <details>
        <summary>Critical</summary>
        <pre> {{ { isCritical: isCritical } }} </pre>
      </details>
      <details>
        <summary>Page Data</summary>
        <pre>{{ pageData }}</pre>
      </details>
      <details>
        <summary>Layout Data</summary>
        <pre>{{ layoutData }}</pre>
      </details>
    </div>
  </content-container>
</template>

<script setup lang="ts">
import { inject, useBoosterCritical } from '#imports';
import { ContentContainer } from 'vue-semantic-structure';
import ElementHeadline from '@/components/element/Headline.vue';
import ElementRichText from '@/components/element/RichText.vue';

import BoosterPicture from '#booster/components/BoosterPicture.vue';

const { isCritical } = useBoosterCritical();

const layoutData = inject('layoutData');
const pageData = inject('pageData');

defineProps<{
  headline: string;
  picture?: typeof BoosterPicture;
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

  & .image {
    display: flex;
    justify-content: center;

    & picture {
      display: block;
      width: em(128);
    }
  }
}
</style>
