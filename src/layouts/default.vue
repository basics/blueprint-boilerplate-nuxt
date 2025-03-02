<template>
  <div>
    <content-container>
      <slot />
    </content-container>
  </div>
</template>

<script setup lang="ts">
import { ContentContainer } from 'vue-semantic-structure';
</script>
