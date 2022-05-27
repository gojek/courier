import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Courier-GO',
    Svg: require('@site/static/img/logo-golang.svg').default,
    description: (
      <>
        Go package for creating long running connection using MQTT protocol
      </>
    ),
    link: 'https://gojek.github.io/courier-go/'
  },
  {
    title: 'Courier-Android',
    Svg: require('@site/static/img/logo-android.svg').default,
    description: (
      <>
        Android library for creating long running connection using MQTT protocol
      </>
    ),
    link: 'https://gojek.github.io/courier-android/'
  },
  {
    title: 'Courier-iOS',
    Svg: require('@site/static/img/logo-ios.svg').default,
    description: (
      <>
        iOS library for creating long running connection using MQTT protocol
      </>
    ),
    link: 'https://gojek.github.io/courier-iOS/'
  },
];

function Feature({title, Svg, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
        <a className="button" href={link} target="_blank">Documentation</a>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
