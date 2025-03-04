<template>
  <div>
    <content-container>
      <slot />
    </content-container>
  </div>
</template>

<script setup lang="ts">
import { useLayoutContent } from '#imports';
import { provide } from 'vue';
import { ContentContainer } from 'vue-semantic-structure';

const { fetch } = useLayoutContent();
const layoutData = await fetch();

provide('layoutData', layoutData);
</script>
