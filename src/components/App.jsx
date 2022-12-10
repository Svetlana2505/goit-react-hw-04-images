import { useState, useEffect } from 'react';
import { fetchImage } from '../services/imageApi';
import { Button } from './Button/Button';
import { imageMapper } from '../utils/mapper';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Searchbar from './Searschbar/Searchbar';
import ModalWindow from './Modal/Modal';
import { Circles } from 'react-loader-spinner';
import { Section } from './Section/Section';

export default function App() {
  const [images, setImages] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [currentImage, setCurrentImage] = useState(null);

  const handleButtonClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsLoading(true);
    fetchImage(page, query)
      .then(({ data: { hits, totalHits } }) => {
        setImages(prevImages => [...prevImages, ...imageMapper(hits)]);
        setShowButton(page < Math.ceil(totalHits / 12));
        setIsLoading(false);
      })
      .catch(console.log);
  }, [query, page]);

  const searchQuery = text => {
    setQuery(text);
    setImages([]);
    setPage(1);
    setShowButton(false);
  };

  const openModal = data => {
    setCurrentImage(data);
  };

  const closeModal = () => {
    setCurrentImage(null);
  };

  return (
    <>
      <Searchbar onSubmit={searchQuery} />
      <Section>
        <ImageGallery images={images} openModal={openModal} />
        {isLoading && (
          <Circles
            height="100"
            width="100"
            color="#3f51b5"
            ariaLabel="circles-loading"
            wrapperStyle={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translete(-50%,-50%)',
            }}
            wrapperClass=""
            visible={true}
          />
        )}

        {showButton && (
          <Button text="Load more" clickHandler={handleButtonClick} />
        )}
      </Section>

      {currentImage && (
        <ModalWindow image={currentImage} onClose={closeModal} />
      )}
    </>
  );
}
