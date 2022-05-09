import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Container from '../core/Container';
import GridBlock from '../core/GridBlock';

const HomepageHeader = () => {
  const {siteConfig} = useDocusaurusContext();
  return (
      <div className="homeHero">
        <div className="logo"><img src={useBaseUrl('img/pattern.svg')} /></div>
        <div className="container banner">
          <div className="row">
            <div className={clsx('col col--5')}>
              <div className="homeTitle">{siteConfig.title}</div>
              <small className="homeSubTitle">{siteConfig.tagline}</small>
              <a className="button" href="#docs">Documentation</a>
            </div>
            <div className={clsx('col col--1')}></div>
            <div className={clsx('col col--6')}>
              <div className="text--right"><img src={useBaseUrl('img/courier.png')} /></div>
            </div>
          </div>
        </div>
      </div >
    );
};

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <Container className="textSection wrapper" background="dark">
          <h1>Key Features</h1>
          <p>
            Courier provides a mechanism for creating long running connection on mobile applications and backend services using MQTT protocol
          </p>
          <GridBlock
            contents={[
              {
                title: 'Quality of Service',
                content: (
                  <div>
                    Supports three QoS delivery levels: 0 (atmost once), 1 (atleast once) and 2 (exactly once)
                  </div>
                ),
              },
              {
                title: 'Clean API',
                content: (
                  <div>
                    Provides clean API for connect / disconnect, subscribe / unsubscribe and publish / receive functionalities
                  </div>
                ),
              },
              {
                title: 'Automatic Reconnect',
                content: (
                  <div>
                    Automatically reconnects in case of network or other unexpected failures
                  </div>
                ),
              },
              {
                title: 'Observability',
                content: (
                  <div>
                    Provides events for tracking end-to-end delivery
                  </div>
                ),
              },
              {
                title: 'Flexible Encoder/Decoder support',
                content: (
                  <div>
                    Converts message payload to and from any custom message type
                  </div>
                ),
              },
              {
                title: 'Open Source',
                content: (
                  <div>
                    Open-source client libraries for GoLang, Android & iOS
                  </div>
                ),
              },
            ]}
          />
        </Container>
        <div id="docs">
          <HomepageFeatures />
        </div>
      </main>
    </Layout>
  );
}
