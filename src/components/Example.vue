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
import { useBoosterCritical } from '#imports';
import { inject, onMounted, onUnmounted } from 'vue';
import { ContentContainer } from 'vue-semantic-structure';
import ElementHeadline from '@/components/element/Headline.vue';
import ElementRichText from '@/components/element/RichText.vue';

import BoosterPicture from '#booster/components/BoosterPicture.vue';
import useViewportObserver from '~/composables/useViewportObserver';
import useDirectionObserver from '~/composables/useDirectionObserver';
import { Subscription } from 'rxjs';
import useResizeObserver from '~/composables/useResizeObserver';
import useScrollObserver from '~/composables/useScrollObserver';

const { isCritical } = useBoosterCritical();

const layoutData = inject('layoutData');
const pageData = inject('pageData');
const createViewportObserver = useViewportObserver();
const createDirectionObserver = useDirectionObserver();
const createScrollObserver = useScrollObserver();
const createResizeObserver = useResizeObserver();

let subscriptions: Subscription | undefined;
onMounted(() => {
  subscriptions = new Subscription();
  const directionObserver = createDirectionObserver();
  const viewportObserver = createViewportObserver();
  const scrollObserver = createScrollObserver();
  const resizeObserver = createResizeObserver();

  [
    directionObserver.subscribe(entry => {
      console.log('directionObserver', JSON.stringify(entry, null, 2));
    }),
    viewportObserver.subscribe(entry => {
      console.log('viewportObserver', JSON.stringify(entry, null, 2));
    }),
    scrollObserver.subscribe(entry => {
      console.log('scrollObserver', JSON.stringify(entry, null, 2));
    }),
    resizeObserver.subscribe(entry => {
      console.log('resizeObserver', JSON.stringify(entry, null, 2));
    })
  ].forEach(subscription => subscriptions?.add(subscription));
});

onUnmounted(() => {
  subscriptions?.unsubscribe();
});

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
