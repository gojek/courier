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
            Stream processing platform for transforming, aggregating and enriching
            data in real-time mode with ease of operation & unbelievable reliability.
            Dagger can deployd in VMs or cloud-native environment to makes resource provisioning and deployment
            simple & straight-forward, the only limit to your data processing is your imagination.
          </p>
          <GridBlock
            contents={[
              {
                title: 'Aggregations',
                content: (
                  <div>
                    Supports Tumble & Slide for time-windows. Longbow feature
                    supports large windows upto 30-day.
                  </div>
                ),
              },
              {
                title: 'SQL Support',
                content: (
                  <div>
                    Query writing made easy through formatting, suggestions,
                    auto-completes and template queries.
                  </div>
                ),
              },
              {
                title: 'Stream Enrichment',
                content: (
                  <div>
                    Enrich Kafka messages from HTTP endpoints or database sources to bring
                    offline & reference data context to real-time processing.
                  </div>
                ),
              },
              {
                title: 'Observability',
                content: (
                  <div>
                    Always know what’s going on with your deployment with built-in monitoring
                    of throughput, response times, errors and more.
                  </div>
                ),
              },
              {
                title: 'Analytics Ecosystem',
                content: (
                  <div>
                    Dagger can transform, aggregate, join and enrich data in real-time
                    for operational analytics using InfluxDB, Grafana and others.
                  </div>
                ),
              },
              {
                title: 'Stream Transformations',
                content: (
                  <div>
                    Convert Kafka messages on the fly for a variety of
                    use-cases such as feature engineering.
                  </div>
                ),
              },
            ]}
          />
        </Container>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
