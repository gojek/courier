// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Courier',
  tagline: 'Information SuperHighway',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/courier-docs/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'anubhav7nov', // Usually your GitHub org/user name.
  projectName: 'courier-docs', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Courier',
        logo: {
          src: 'img/logo.svg',
        },
        items: [
          {to: '/blog', label: 'Blog', position: 'left'},
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Platforms',
            items: [
              { label: 'Golang', href: 'https://github.com/gojek/courier-go' },
              { label: 'Android', href: 'https://github.com/gojekfarm/courier-android' },
              { label: 'iOS', href: 'https://github.com/gojekfarm/courier-iOS' },
            ],
          },
          {
            title: 'Resources',
            items: [
              { label: 'Blog', to: '/blog', },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Gojek`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
