import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ImageCarousel.css'; // Import your custom CSS file
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
const ImageCarousel = () => {
  return (
    <Carousel className="rounded-carousel">
      <Carousel.Item>
        <img
          className="d-block w-100 rounded-image"
          src={image2}
          alt="First slide"
        />
        <Carousel.Caption className="carousel-caption-overlay">
          <h3>TELEBILLPRO</h3>
          <p>Connection With People Made Easier</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 rounded-image"
          src={image1}
          alt="Second slide"
        />
        <Carousel.Caption className="carousel-caption-overlay">
          {/* <h3>Second Slide Title</h3>
          <p>Second slide description goes here.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default ImageCarousel;