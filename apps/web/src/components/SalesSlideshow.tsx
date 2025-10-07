import { useState, useEffect } from 'react';
import image1 from '../assets/salesimages/image.png';
import image2 from '../assets/salesimages/image2.png';
import image3 from '../assets/salesimages/image3.png';
import image4 from '../assets/salesimages/image4.png';
import image5 from '../assets/salesimages/image5.png';
import image6 from '../assets/salesimages/image6.png';
import image7 from '../assets/salesimages/image7.png';
import image8 from '../assets/salesimages/image8.png';

const salesImages = [image1, image2, image3, image4, image5, image6, image7, image8];

export function SalesSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % salesImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? salesImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % salesImages.length);
  };

  return (
    <div className="relative group">
      <div className="relative overflow-hidden rounded-2xl border-4 border-gold shadow-2xl">
        {/* Images */}
        <div className="relative h-[500px]">
          {salesImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Sales ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-gold rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Previous image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-gold rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Next image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {salesImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all ${
                index === currentIndex
                  ? 'w-8 h-3 bg-gold'
                  : 'w-3 h-3 bg-white/60 hover:bg-white/80'
              } rounded-full`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="absolute top-4 right-4 bg-black/60 text-gold px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
          {currentIndex + 1} / {salesImages.length}
        </div>
      </div>

      {/* Caption */}
      <div className="mt-4 text-center">
        <p className="text-gray-600 italic">
          🏆 Recent successful sales by Top Choice Realty
        </p>
      </div>
    </div>
  );
}

