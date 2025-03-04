<template>
  <div :class="pageData.class">
    <component
      :is="item.component"
      v-for="(item, index) in components"
      :key="index"
      :critical="index < 1"
      v-bind="item.data"
    />
  </div>
</template>

<script setup lang="ts">
import { joinURL } from 'ufo';
import {
  useRuntimeConfig,
  usePageContent,
  useSeoMeta,
  useHead,
  provide
} from '#imports';
const { fetch } = usePageContent();
const pageData = await fetch();
const { components, title, description, image } = pageData;

const {
  app: { baseURL },
  public: {
    general: { url }
  }
} = useRuntimeConfig();

provide('pageData', pageData);

useHead({});
useSeoMeta({
  title: () => title,
  ogTitle: () => title,
  description: () => description,
  ogDescription: () => description,
  ogImage: () => image?.src && joinURL(url, baseURL, image.src),
  ogImageWidth: () => image?.width,
  ogImageHeight: () => image?.height,
  ogImageType: () => image?.type
});
</script>
