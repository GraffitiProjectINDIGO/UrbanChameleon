import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useEffect } from 'react';
import Slider from 'react-slick';
import styles from './Carousel.module.scss';

interface CarouselProps {
  artifacts: { id: string; imageUrl: string; title: string }[];
}

const MyCarousel: React.FC<CarouselProps> = ({ artifacts }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    centerPadding: '60px',
    swipe: true,
  };

  const sliderRef = React.useRef<Slider>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        sliderRef.current?.slickNext();
      } else if (event.key === 'ArrowLeft') {
        sliderRef.current?.slickPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      <Slider {...settings} ref={sliderRef}>
        {artifacts.map((artifact) => (
          <div key={artifact.id} className={styles.slide}>
            {artifact.imageUrl && (
              <img
                src={artifact.imageUrl}
                alt={artifact.title}
                className={styles.image}
              />
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MyCarousel;
