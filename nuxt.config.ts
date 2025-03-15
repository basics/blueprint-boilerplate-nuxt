import path from 'pathe';
import { defineNuxtConfig } from 'nuxt/config';
import svgLoader from 'vite-svg-loader';
import * as postcssFunctions from './src/globals/postcss/functions';
import { DEFAULT_LOCALE } from './i18n.config';
import checker from 'vite-plugin-checker';

const isDev = process.env.NODE_ENV === 'development';

export default defineNuxtConfig({
  dev: isDev,
  ssr: true,

  srcDir: 'src',

  css: ['@/assets/css/vars.pcss', '@/assets/css/base.pcss'],

  compatibilityDate: '2025-03-01',

  devtools: { enabled: false },

  imports: {
    autoImport: false
  },

  components: false,

  site: {
    indexable: false,
    trailingSlash: true,
    url: getWebsiteHost()
  },

  build: {
    transpile: [
      'sort-css-media-queries',
      'sort-css-media-queries/lib/create-sort.js'
    ]
  },

  app: {
    baseURL: getBaseUrl(),
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        {
          charset: 'utf-8'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        }
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/icon.png' }]
    }
  },

  runtimeConfig: {
    isDev,
    public: {
      general: {
        url: getWebsiteHost()
      }
    }
  },

  devServer: {
    port: getPort(),
    host: getHost()
  },

  vite: {
    plugins: [
      svgLoader({
        defaultImport: 'component', // or 'raw'
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  collapseGroups: false
                }
              }
            }
          ]
        }
      }),
      checker({
        vueTsc: true
      })
    ]
  },

  postcss: {
    plugins: {
      'postcss-preset-env': {
        preserve: true,
        stage: 0,
        features: {
          'nesting-rules': true
        }
      },
      '@csstools/postcss-global-data': {
        files: [
          path.resolve(
            __dirname,
            'src/globals/postcss/preset-env/custom-media.pcss'
          )
        ]
      },
      'postcss-custom-media': {},
      'postcss-functions': {
        functions: postcssFunctions
      },
      'postcss-normalize': {},
      'postcss-momentum-scrolling': ['scroll'],
      'rucksack-css': {},
      '@fullhuman/postcss-purgecss': {
        content: [
          'src/pages/**/*.vue',
          'src/layouts/**/*.vue',
          'src/components/**/*.vue'
        ],
        safelist: ['html', 'body', /nuxt-/]
      },
      cssnano: {
        preset: [
          'default',
          {
            discardDuplicates: false,
            mergeRules: false
          }
        ]
      }
    },
    order: 'cssnanoLast'
  },

  generate: {
    routes: ['/', '/de']
  },

  i18n: {
    locales: [
      {
        code: 'de',
        language: 'de-DE'
      },
      {
        code: 'en',
        language: 'en-EN'
      }
    ],
    detectBrowserLanguage: {
      useCookie: false
    },
    defaultLocale: DEFAULT_LOCALE,
    strategy: 'prefix_except_default',
    vueI18n: './i18n.config.js'
  },

  image: {
    // The screen sizes predefined by `@nuxt/image`:
    screens: {
      default: 320,
      xxs: 480,
      xs: 576,
      sm: 768,
      md: 996,
      lg: 1200,
      xl: 1367,
      xxl: 1600,
      '4k': 1921
    },
    domains: [],
    alias: {}
  },

  booster: {
    fonts: [
      {
        family: 'Open Sans',
        fallback: ['sans-serif'],
        variances: [
          {
            style: 'normal',
            weight: 300,
            sources: [
              {
                src: '@/assets/fonts/open-sans-v40-latin/open-sans-v40-latin-300.woff2',
                type: 'woff2'
              }
            ]
          },
          {
            style: 'italic',
            weight: 300,
            sources: [
              {
                src: '@/assets/fonts/open-sans-v40-latin/open-sans-v40-latin-300italic.woff2',
                type: 'woff2'
              }
            ]
          },
          {
            style: 'normal',
            weight: 400,
            sources: [
              {
                src: '@/assets/fonts/open-sans-v40-latin/open-sans-v40-latin-regular.woff2',
                type: 'woff2'
              }
            ]
          },
          {
            style: 'italic',
            weight: 400,
            sources: [
              {
                src: '@/assets/fonts/open-sans-v40-latin/open-sans-v40-latin-italic.woff2',
                type: 'woff2'
              }
            ]
          },
          {
            style: 'normal',
            weight: 600,
            sources: [
              {
                src: '@/assets/fonts/open-sans-v40-latin/open-sans-v40-latin-600.woff2',
                type: 'woff2'
              }
            ]
          },
          {
            style: 'italic',
            weight: 600,
            sources: [
              {
                src: '@/assets/fonts/open-sans-v40-latin/open-sans-v40-latin-600italic.woff2',
                type: 'woff2'
              }
            ]
          },
          {
            style: 'normal',
            weight: 700,
            sources: [
              {
                src: '@/assets/fonts/open-sans-v40-latin/open-sans-v40-latin-700.woff2',
                type: 'woff2'
              }
            ]
          },
          {
            style: 'italic',
            weight: 700,
            sources: [
              {
                src: '@/assets/fonts/open-sans-v40-latin/open-sans-v40-latin-700italic.woff2',
                type: 'woff2'
              }
            ]
          }
        ]
      }
    ]
  },

  modules: [
    ...(isDev ? ['@nuxtjs/eslint-module', '@nuxtjs/stylelint-module'] : []),
    '@nuxt/eslint',
    '@nuxtjs/seo',
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@pinia/nuxt',
    'nuxt-booster'
  ],

  schemaOrg: {
    enabled: false
  },

  linkChecker: {
    failOnError: false
  }
});

function getBaseUrl() {
  return process.env.npm_config_base_url ?? process.env.BASE_URL ?? '/';
}

function getWebsiteHost() {
  return (
    process.env.npm_config_website_host ??
    process.env.WEBSITE_HOST ??
    'https://'
  );
}

function getHost() {
  return process.env.npm_config_host ?? process.env.HOST ?? 'localhost';
}

function getPort() {
  return Number(process.env.npm_config_port ?? process.env.PORT ?? 8050);
}
