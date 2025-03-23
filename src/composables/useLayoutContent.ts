import { useI18n, queryCollection, useAsyncData } from '#imports';
import type { MarkdownRoot } from '@nuxt/content';

export interface LayoutContent extends MarkdownRoot {
  title: string;
  components: object;
}

export function useLayoutContent() {
  const { locale } = useI18n();

  return {
    fetch: async () => {
      const { data } = await useAsyncData(
        `layout-data-${locale.value}`,
        () =>
          queryCollection('layout')
            .path(`/layout/${locale.value}`)
            .first()
            .then(data => data?.body || {}),
        { watch: [locale] }
      );

      return data;
    }
  };
}
