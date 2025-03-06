import { defineNuxtPlugin, useBoosterHydrate } from '#imports';

const hydrate = useBoosterHydrate();

export default defineNuxtPlugin(nuxtApp => {
  const { vueApp } = nuxtApp;

  Object.entries(globalComponents).forEach(
    ([name, { component, componentHydrate }]) =>
      vueApp.component(name, hydrate(component, componentHydrate))
  );
});

const globalComponents = {
  Example: {
    component: () => import('@/components/Example.vue'),
    componentHydrate: undefined
  }
};
