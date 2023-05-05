import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  faClock,
  faLayerGroup,
  faMapMarkerAlt,
  faPalette,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Artifact, getArtifactsData } from '../components/api';
import Footer from '../components/Footer';
import LogosGrid from '../components/LogosGrid';
import Navbar from '../components/Navbar';
import styles from './styles.module.scss';

interface HomeProps {
  artifacts: Artifact[];
}

const Home: React.FC<HomeProps> = ({ artifacts }) => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.title}>
          <p style={{ fontSize: 40 }}>
            graffiti makes people laugh, wonder, angry, think
            <br />
            graffiti is a <span style={{ color: '#f1881f' }}>
              unique
            </span> | <span style={{ color: '#0dace5' }}>complex</span> |{' '}
            <span style={{ color: '#d2145c' }}>short-lived</span> |{' '}
            <span style={{ color: '#270089' }}>socially relevant</span> form of
            cultural heritage
          </p>
        </div>
        <div className={styles.description}>analyse and discover the graffiti-scape at the Danube Canal in Vienna, Austria</div>
        <div className={styles.iconTextContainer}>

          <div className={styles.iconText}><svg className="clockIcon" width="48" height="48" viewBox="0 0 24 24">
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#e95095", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#7049ba", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      fill="url(#gradient)"
      d="M12 22C6.486 22 2 17.514 2 12C2 6.486 6.486 2 12 2C17.514 2 22 6.486 22 12C22 17.514 17.514 22 12 22ZM12 4C7.582 4 4 7.582 4 12C4 16.418 7.582 20 12 20C16.418 20 20 16.418 20 12C20 7.582 16.418 4 12 4ZM11 6H13V12L18.707 14.707L17.414 16.414L11 12.586V6Z"
    />
  </svg>
          <div><p>temporally</p></div></div>
          <div className={styles.iconText}><svg className="mapMarkerAltIcon" width="48" height="48" viewBox="0 0 24 24">
    <defs>
      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#e95095", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#7049ba", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      fill="url(#gradient2)"
      d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2ZM12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9C15 10.6569 13.6569 12 12 12Z"
    />
  </svg>
          <div><p>spatially</p></div></div>
          <div className={styles.iconText}><svg className="paletteIcon" width="48" height="48" viewBox="0 0 24 24">
    <defs>
      <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#e95095", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#7049ba", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      fill="url(#gradient3)"
      d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM11 18H13V20H11V18ZM6.70703 15.707L5.29297 14.293L7.58579 12L5.29297 9.70703L6.70703 8.29297L9 10.5858L11.2929 8.29297L12.707 9.70703L10.4142 12L12.707 14.293L11.2929 15.707L9 13.4142L6.70703 15.707ZM15 20H17V22H15V20ZM18 14H20V16H18V14Z"
    />
  </svg>
          <div><p>chromatic</p></div></div>
          <div className={styles.iconText}><svg className="layerGroupIcon" width="48" height="48" viewBox="0 0 24 24">
    <defs>
      <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#e95095", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#7049ba", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      fill="url(#gradient4)"
      d="M3 18H21L12 22L3 18ZM21 16H3L12 12L21 16ZM12 2L21 6H3L12 2Z"
    />
  </svg>
          <div><p>stratigraphically</p></div></div>
        </div>
        <div className={styles.carousel}>
          <Carousel
            showArrows
            swipeable
            showThumbs={true}
            showIndicators={false}
            infiniteLoop={true}
          >
            {artifacts &&
              artifacts.map((artifact) => (
                <div key={artifact.id}>
                  {artifact.imageUrl && (
                    <img
                      src={artifact.imageUrl}
                      alt={artifact.title}
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  )}
                </div>
              ))}
          </Carousel>
        </div>
        <div className="logosGrid">
          <LogosGrid />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;

export async function getStaticProps() {
  try {
    const artifacts = await getArtifactsData();
    return {
      props: {
        artifacts,
      },
      revalidate: 60, // Optional: Time in seconds after which a page re-generation can occur (in this case, 60 seconds)
    };
  } catch (error) {
    console.error('Error fetching artifacts data:', error);
    return {
      props: {
        artifacts: [],
      },
      revalidate: 60,
    };
  }
}
