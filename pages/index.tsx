import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import { Artifact, getArtifactsData } from '../components/api';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] });

interface HomeProps {
  artifacts: Artifact[];
}

const Home: React.FC<HomeProps> = ({ artifacts }) => {
  return (
    <>
      <Navbar />
      {/* Add the Carousel component */}
      <Carousel>
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
      {/* Rest of the code */}
      <Footer />
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  try {
    const artifacts = await getArtifactsData();
    return {
      props: {
        artifacts,
      },
    };
  } catch (error) {
    console.error('Error fetching artifacts data:', error);
    return {
      props: {
        artifacts: [],
      },
    };
  }
}
