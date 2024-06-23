import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarImageSliderProps {
  images: { id: string, image: string }[];
}

const CarImageSlider: React.FC<CarImageSliderProps> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (images.length > 1) {
    return (
      <Slider {...settings}>
        {images.map(image => (
          <div key={image.id}>
            <Image src={image.image} alt={`Car Image ${image.id}`} width={600} height={400} />
          </div>
        ))}
      </Slider>
    );
  } else {
    return (
      <Image src={images[0].image} alt="Car Image" width={600} height={400} />
    );
  }
};

export default CarImageSlider;