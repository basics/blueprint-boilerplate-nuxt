import { useRoute, queryCollection, useSetI18nParams } from '#imports';
import type { MarkdownRoot } from '@nuxt/content';
import type { MetaFlat } from 'zhead';

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
    src: MetaFlat['ogImageUrl'];
    width: MetaFlat['ogImageWidth'];
    height: MetaFlat['ogImageHeight'];
    type: MetaFlat['ogImageType'];
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
        .then(({ body }) => body as PageContent);

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
