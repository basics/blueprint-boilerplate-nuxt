import { useRoute, queryCollection, useSetI18nParams } from '#imports';
import type { MarkdownRoot } from '@nuxt/content';

interface PageContentComponent {
  component: string;
  data: Record<string, unknown>;
}

interface PageContent extends MarkdownRoot {
  class: string | undefined;
  i18nParams: Record<string, string>;
  title: string;
  description?: string;
  components: PageContentComponent[];
  image?: {
    src: string;
    width: number;
    height: number;
    type: 'image/png' | 'image/jpeg' | 'image/gif' | undefined;
  };
}

export function usePageContent() {
  const route = useRoute();
  const setI18nParams = useSetI18nParams({});

  return {
    fetch: async () => {
      const path = `/pages${normalizePath(route.path).replace('/index', '')}`;
      const { components, i18nParams, ...meta } = await queryCollection('page')
        .path(path)
        .first()
        .then(data => (data?.body || {}) as PageContent);

      if (!import.meta.server) {
        setI18nParams(i18nParams);
      }

      return {
        components,
        ...meta
      };
    }
  };
}

function normalizePath(path?: string) {
  return `${path || 'index'}`;
}
