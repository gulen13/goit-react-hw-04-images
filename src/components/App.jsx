import { useState, useEffect } from 'react';
import * as ImageService from 'service/image-service';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './ModalWindow/Modal';
import { Text } from './Text/Text.styled';
import { Container } from './Container/Container.styled';

const App = () => {
  const [value, setvalue] = useState('');
  const [page, setpage] = useState(1);
  const [items, setitems] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isEmpty, setisEmpty] = useState(false);
  const [showBtn, setshowBtn] = useState(false);
  const [error, seterror] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const [largePhoto, setlargePhoto] = useState('');

  useEffect(() => {
    if (value === '') return;
    setisLoading(true);
    ImageService.getImages(value, page)
      .then(({ hits, total }) => {
        if (!hits.length) {
          setisEmpty(true);
          return;
        }
        setitems(previtems => [...previtems, ...hits]);
        setshowBtn(page < Math.ceil(total / 12));
      })
      .catch(error => {
        seterror(error.message);
      })
      .finally(() => {
        setisLoading(false);
      });
  }, [value, page]);

  const handleSubmit = query => {
    if (query === value) {
      alert('Please enter new query request');
      return;
    }
    setvalue(query);
    setpage(1);
    setitems([]);
    setisLoading(false);
    setisEmpty(false);
    setshowBtn(false);
    seterror(null);
  };

  const handleButton = () => {
    setpage(prevpage => prevpage + 1);
  };

  const openModal = largePhoto => {
    setshowModal(true);
    setlargePhoto(largePhoto);
  };

  const closeModal = () => {
    setshowModal(false);
  };

  return (
    <Container>
      <Searchbar handleSubmit={handleSubmit} />
      {isEmpty && <Text>Sorry. There are no images on your search ... 😭</Text>}
      <ImageGallery page={page} gallery={items} openModal={openModal} />
      {showBtn && <Button onClick={handleButton} />}
      {isLoading && <Loader />}
      {error && <Text>Sorry. {error} 😭</Text>}
      {showModal && <Modal largePhoto={largePhoto} closeModal={closeModal} />}
    </Container>
  );
};

export default App;
