import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryStd } from './ImageGallery.styled';
import { useEffect } from 'react';

const ImageGallery = ({ gallery, openModal, page }) => {
  useEffect(() => {
    if (!gallery.length) return;
    if (page > 1) {
      const ul = document.querySelector('ul');
      const { height: cardHeight } =
        ul.lastElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [gallery, page]);

  return (
    <>
      <ImageGalleryStd>
        {gallery.map(({ id, tags, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              alt={tags}
              photo={webformatURL}
              largePhoto={largeImageURL}
              openModal={openModal}
            />
          );
        })}
      </ImageGalleryStd>
    </>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.object),
  openModal: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

export default ImageGallery;
