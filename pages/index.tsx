import 'react-responsive-carousel/lib/styles/carousel.min.css';
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
        <div className={styles.carousel}>
          <Carousel
            showArrows
            swipeable
            centerMode
            centerSlidePercentage={50}
            showThumbs={true}
            showIndicators={false}
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
