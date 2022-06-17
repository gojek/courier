// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Courier',
  tagline: 'Information Superhighway',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/courier/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/courier-logo.ico',
  organizationName: 'gojek', // Usually your GitHub org/user name.
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
          customCss: [
            require.resolve('./src/css/theme.css'),
            require.resolve('./src/css/custom.css')
          ],
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
          src: 'img/courier-logo.svg',
        },
        items: [
          {
            type: 'doc',
            position: 'left',
            docId: 'Introduction',
            label: 'Tutorial',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: '/#docs', label: 'Libraries', position: 'left'},
          {
            href: 'https://github.com/gojek/courier',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Platforms',
            items: [
              { label: 'Golang', href: 'https://github.com/gojek/courier-go' },
              { label: 'Android', href: 'https://github.com/gojek/courier-android' },
              { label: 'iOS', href: 'https://github.com/gojek/courier-iOS' },
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'Gojek open source', href: 'https://github.com/gojek/', },
              { label: 'Discord', href: 'https://discord.gg/C823qK4AK7', },
              { label: 'Twitter', href: 'https://twitter.com/gojektech', },
            ],
          },
        ],
        logo: {
          alt: 'Gojek Open Source Logo',
          src: 'img/gojek-logo-white.png',
          width: 250,
          height: 50,
          href: 'https://github.com/gojek/',
        },
        copyright: `Copyright © ${new Date().getFullYear()} Gojek`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
