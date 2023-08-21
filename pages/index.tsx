import React from 'react';
import MyCarousel from '../components/Carousel';
import {
  Artifact,
  getArtifactsData,
} from '../components/api';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import styles from './styles.module.scss';
import styled from 'styled-components';

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  grid-gap: 20px;
  background-color: #f6f6f6;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.img`
  height: auto;
  width: auto;
  max-height: 50px;
  max-width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

interface HomeProps {
  artifacts: Artifact[];
}

const Home: React.FC<HomeProps> = ({ artifacts }) => {
  return (
    <div className={styles.pageContainer}>
        <Navbar />
        <div className={styles.triangleBackground}>
          <svg className={styles.triangleSVG} width="100%" height="25vh" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#e95095' }} />
                <stop offset="100%" style={{ stopColor: '#7049ba' }} />
              </linearGradient>
            </defs>
            <polygon points="0,0 100,0 50,100" fill="url(#triangleGradient)" fillOpacity="0.8" />
          </svg>
        <div className={styles.centerContainer}>
          <div className={styles.chameleonContainer}>
            <img src="/images/Chameleon.png" alt="Chameleon" className={styles.chameleonImage} />
              <div className={styles.chameleonText}>
              URBAN<br />
              CHAMELEON
          </div>
        </div>
        <div className={styles.title}>
          <p style={{ fontSize: 30 }}>
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
        <div className={styles.description}>
          analyse and discover the graffiti-scape at the Danube Canal in Vienna,
          Austria
        </div>
        <div className={styles.iconTextContainer}>
          <div className={styles.iconText}>
            <svg
              className="clockIcon"
              width="48"
              height="48"
              viewBox="0 0 24 24"
            >
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: '#e95095', stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: '#7049ba', stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
              <path
                fill="url(#gradient)"
                d="M12 22C6.486 22 2 17.514 2 12C2 6.486 6.486 2 12 2C17.514 2 22 6.486 22 12C22 17.514 17.514 22 12 22ZM12 4C7.582 4 4 7.582 4 12C4 16.418 7.582 20 12 20C16.418 20 20 16.418 20 12C20 7.582 16.418 4 12 4ZM11 6H13V12L18.707 14.707L17.414 16.414L11 12.586V6Z"
              />
            </svg>
            <div>
              <p>temporally</p>
            </div>
          </div>
          <div className={styles.iconText}>
            <svg
              className="mapMarkerAltIcon"
              width="48"
              height="48"
              viewBox="0 0 24 24"
            >
              <defs>
                <linearGradient
                  id="gradient2"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: '#e95095', stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: '#7049ba', stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
              <path
                fill="url(#gradient2)"
                d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2ZM12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9C15 10.6569 13.6569 12 12 12Z"
              />
            </svg>
            <p>spatially</p>
          </div>

          <div className={styles.iconText}>
            <svg
              className="colorDropletIcon"
              width="48"
              height="48"
              viewBox="0 0 24 24"
            >
              <defs>
                <linearGradient
                  id="gradientColorDroplet"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: '#e95095', stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: '#7049ba', stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
              <path
                fill="url(#gradientColorDroplet)"
                d="M12 2C6.5 2 2 7.5 2 14c0 5.5 4.5 10 10 10s10-4.5 10-10C22 7.5 17.5 2 12 2zM12 22c-4.4 0-8-3.6-8-8 0-3.3 3.3-6 6.6-7.6l1.4 1.6c.2.2.5.2.7 0l1.4-1.6C16.7 8 20 10.7 20 14c0 4.4-3.6 8-8 8z"
              />
            </svg>
            <p>chromatic</p>
          </div>
          <div className={styles.iconText}>
            <svg
              className="freeLayerGroupIcon"
              width="48"
              height="48"
              viewBox="0 0 24 24"
            >
              <defs>
                <linearGradient
                  id="gradientFreeLayerGroup"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: '#e95095', stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: '#7049ba', stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
              <path
                fill="url(#gradientFreeLayerGroup)"
                d="M12,2c-1.103,0-2,0.897-2,2s0.897,2,2,2s2-0.897,2-2S13.103,2,12,2z M21,7H3c-0.552,0-1,0.448-1,1v1c0,0.552,0.448,1,1,1h18 c0.552,0,1-0.448,1-1V8C22,7.448,21.552,7,21,7z M21,12H3c-0.552,0-1,0.448-1,1v1c0,0.552,0.448,1,1,1h18c0.552,0,1-0.448,1-1v-1 C22,12.448,21.552,12,21,12z M21,17H3c-0.552,0-1,0.448-1,1v1c0,0.552,0.448,1,1,1h18c0.552,0,1-0.448,1-1v-1 C22,17.448,21.552,17,21,17z"
              />
            </svg>
            <div>
              <p>stratigraphically</p>
            </div>
          </div>
        </div>
          <div >
              <MyCarousel artifacts={artifacts} />
          </div>
        </div>
        </div>
        <Grid style={{ marginTop: '30px' }}>
          <LogoContainer>
            <a
              target="_blank"
              href="https://archpro.lbg.ac.at/"
              rel="noopener"
              aria-label="Link"
            >
              <StyledImage
                src="https://projectindigo.eu/wp-content/uploads/2021/09/Logo_LBI_ArchPro.svg"
                alt="LBI ArchPro"
                decoding="async"
                loading="lazy"
              />
            </a>
          </LogoContainer>
          <LogoContainer>
            <a
              target="_blank"
              href="https://www.geo.tuwien.ac.at/"
              rel="noopener"
              aria-label="Link"
            >
              <StyledImage
                src="https://projectindigo.eu/wp-content/uploads/2021/09/Logo_GEO_with_text.png"
                alt="Geo TU Wien"
                decoding="async"
                loading="lazy"
              />
            </a>
          </LogoContainer>
          <LogoContainer>
            <a
              target="_blank"
              href="https://spraycity.at/"
              rel="noopener"
              aria-label="Link"
            >
              <StyledImage
                src="https://projectindigo.eu/wp-content/uploads/2021/09/Logo_SprayCity_border-1536x1360.png"
                alt="SprayCity"
                decoding="async"
                loading="lazy"
              />
            </a>
          </LogoContainer>
          <LogoContainer>
            <a
              target="_blank"
              href="https://www.oeaw.ac.at/acdh/acdh-ch-home/"
              rel="noopener"
              aria-label="Link"
            >
              <StyledImage
                src="https://projectindigo.eu/wp-content/uploads/2021/09/Logo_OEAW-ACDH-CH_smaller.png"
                alt="ACDH-CH"
                decoding="async"
                loading="lazy"
              />
            </a>
          </LogoContainer>
        </Grid>
      <Footer />
    </div>
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
      revalidate: 60, 
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
