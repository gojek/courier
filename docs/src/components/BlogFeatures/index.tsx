import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type BlogItem = {
  title: string;
  imageUrl: string;
  description: JSX.Element;
  link: string;
  date: string;
  readTimeMinutes: string;
};

const BlogList: BlogItem[] = [

  {
    title: 'Introducing Courier - The Information Superhighway Between Mobile & Server',
    imageUrl: 'https://blog.gojek.io/content/images/2021/08/GoFoodCourier-01-2.jpg',
    description: (
      <>
        Here's how we built Courier, a persisting connection through which we're able to push content from our server to the app.
      </>
    ),
    link: 'https://www.gojek.io/blog/introducing-courier-the-information-superhighway-between-mobile-server',
    date: 'Aug 15',
    readTimeMinutes: '5'
  },
  {
    title: 'The Quest For A Message Broker For Our \'Courier\'',
    imageUrl: 'https://blog.gojek.io/content/images/2021/08/MQTT-2.png',
    description: (
      <>
        This is part-2 of how we built Courier, the information superhighway between mobile devices and our backend servers.
      </>
    ),
    link: 'https://www.gojek.io/blog/the-quest-for-a-message-broker-for-our-courier',
    date: 'Aug 20',
    readTimeMinutes: '5'
  },
  {
    title: 'Courier Library For Gojek\'s Information Superhighway',
    imageUrl: 'https://blog.gojek.io/content/images/2021/10/Courier-Library-2.png',
    description: (
      <>
        This is part-3 of how we built Courier, the information superhighway between mobile devices and our backend servers.
      </>
    ),
    link: 'https://www.gojek.io/blog/courier-library-for-gojeks-information-superhighway',
    date: 'Oct 01',
    readTimeMinutes: '7'
  },
  {
    title: 'Building A Messaging Highway For Our iOS Apps',
    imageUrl: 'https://blog.gojek.io/content/images/2021/10/Blog-Banner_Courier-1.jpg',
    description: (
      <>
        How we built a Courier library for iOS with MQTT.
      </>
    ),
    link: 'https://www.gojek.io/blog/building-a-messaging-highway-for-our-ios-apps',
    date: 'Oct 26',
    readTimeMinutes: '5'
  },
  {
    title: 'Adaptive Heartbeats For Our Information Superhighway',
    imageUrl: 'https://blog.gojek.io/content/images/2021/11/Blog-banner_-adaptive-heartbeat-01-2.jpg',
    description: (
      <>
        How the 'Adaptive Keepalive' feature in our Courier library finds the most optimal Keepalive interval for a client on a particular network.
      </>
    ),
    link: 'https://www.gojek.io/blog/adaptive-heartbeats-for-our-information-superhighway',
    date: 'Nov 16',
    readTimeMinutes: '5'
  },
  {
    title: 'Acing 1 Million Concurrent MQTT Connections',
    imageUrl: 'https://blog.gojek.io/content/images/2022/04/Blog-Banner_Acing-1-million-concurrent-MQTT-connections_010222_SB-2.jpg',
    description: (
      <>
        How we reached a million long-running persistent connections in a test environment using MZBench as our load testing tool.
      </>
    ),
    link: 'https://www.gojek.io/blog/acing-1-million-concurrent-mqtt-connections',
    date: 'April 15',
    readTimeMinutes: '6'
  },
];

function Feature({title, imageUrl, description, link, date, readTimeMinutes}: FeatureItem) {
  return (
    <a href={link} class="post" target="_blank">
       <div class="card border-0 bg-transparent">
          <div className={styles.featureSvg}>
            <img src={imageUrl}/>
          </div>
          <div className="text--center padding-horiz--md">
            <h5 class=" title">{title}</h5>
            <p class=" description">{description}</p>
          </div>
          <div className="padding-horiz--md">
            <p class="date-time">{date} | {readTimeMinutes} min read</p>
          </div>
       </div>
    </a>
  );
}

export default function BlogFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {BlogList.map((props, idx) => (
            <div className={styles.feature}>
                <Feature key={idx} {...props} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


