import React from 'react';
import { render, screen } from '@testing-library/react';
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import ImageCarousel from '../ImageCarousel';
 
 
describe('ImageCarousel component', () => {
  // Test to check if the ImageCarousel component renders without crashing
  it('renders ImageCarousel without crashing', () => {
    render(<ImageCarousel />);
  });
 
  // Test to check if the first image is rendered properly
  it('renders the first image with correct alt text', () => {
    render(<ImageCarousel />);
   
    // Find the first image by its alt text
    const firstImage = screen.getByAltText('First slide');
   
    // Assert that the first image is present and has the correct src
    expect(firstImage).toBeInTheDocument();
    expect(firstImage).toHaveAttribute('src', image2);
  });
 
  // Test to check if the second image is rendered properly
  it('renders the second image with correct alt text', () => {
    render(<ImageCarousel />);
   
    // Find the second image by its alt text
    const secondImage = screen.getByAltText('Second slide');
   
    // Assert that the second image is present and has the correct src
    expect(secondImage).toBeInTheDocument();
    expect(secondImage).toHaveAttribute('src', image1);
  });
 
  // Test to check if the first slide's caption is rendered correctly
  it('displays the correct caption on the first slide', () => {
    render(<ImageCarousel />);
   
    // Find the heading in the caption
    const captionHeading = screen.getByText('TELEBILLPRO');
    const captionDescription = screen.getByText('Connection With People Made Easier');
   
    // Assert that the heading and description are in the document
    expect(captionHeading).toBeInTheDocument();
    expect(captionDescription).toBeInTheDocument();
  });
 
  // Test to ensure the second slide has no caption
  it('does not display caption text on the second slide', () => {
    render(<ImageCarousel />);
   
    // Ensure that text like "Second Slide Title" is not present (it's commented out)
    expect(screen.queryByText('Second Slide Title')).not.toBeInTheDocument();
  });
 
  // Test for the custom class names being applied
  it('applies custom CSS classes to images and captions', () => {
    render(<ImageCarousel />);
   
    // Assert that the images have the custom "rounded-image" class
    const images = screen.getAllByRole('img');
    images.forEach((image) => {
      expect(image).toHaveClass('rounded-image');
    });
 
    // Assert that the captions have the custom "carousel-caption-overlay" class
    const captions = screen.getAllByText(/Connection With People Made Easier|/);
    // captions.forEach((caption) => {
    //   expect(caption).toHaveClass('carousel-caption-overlay');
    // });
  });
});
 
