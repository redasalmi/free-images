import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import Loading from "./Loading";
import Error from "./Error";
import InfiniteScroll from "react-infinite-scroll-component";

import { useSelector, useDispatch } from "react-redux";
import { fetchImages, setPageNumber } from "../actions/fetchImages";

const ImagesList = () => {
  const dispatch = useDispatch();
  const [
    images,
    imageSearch,
    imageType,
    imageCategorie,
    pageNumber,
    imageLoaded,
    apiError
  ] = useSelector(state => [
    state.images.images,
    state.images.imageSearch,
    state.images.imageType,
    state.images.imageCategorie,
    state.images.pageNumber,
    state.images.imageLoaded,
    state.images.apiError
  ]);

  // // currently selected image info
  const [currentImage, setCurrentImage] = useState("");
  const [currentImageTag, setCurrentImageTag] = useState("");
  // // // modal loading state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(
    () =>
      dispatch(
        fetchImages(imageType, imageCategorie, pageNumber, imageSearch, false)
      ),
    // eslint-disable-next-line
    []
  );

  const PixabayImage = ({ img }) => (
    <div className="col-12 col-sm-6 col-lg-4 col-xl-3 pixa-container">
      <img
        src={img.webformatURL}
        className="m-2 img-fluid pixa-img"
        alt={img.tags}
        onClick={() => zooomImg(img.largeImageURL, img.tags)}
      />
    </div>
  );

  // Zoom in & out on a selected image
  const zooomImg = (img, imgTag) => {
    setCurrentImageTag(imgTag);
    setCurrentImage(img);
    setModalIsOpen(true);
  };
  const zoomOut = () => {
    setCurrentImageTag("");
    setCurrentImage("");
    setModalLoading(false);
    setModalIsOpen(false);
  };

  return (
    <div>
      <div></div>
      {/* InfiniteScroll, to scroll on fetched images */}
      {!apiError && (
        <InfiniteScroll
          dataLength={images}
          next={() => {
            dispatch(setPageNumber(pageNumber + 1));
            dispatch(
              fetchImages(
                imageType,
                imageCategorie,
                pageNumber,
                imageSearch,
                false
              )
            );
          }}
          hasMore={imageLoaded}
          loader={<Loading />}
          className="row m-1 justify-content-center"
          endMessage={
            <h2 className="font-weight-bold mt-5">Sorry, No Images Found</h2>
          }
        >
          {images.map((image, index) => (
            <PixabayImage img={image} key={index} />
          ))}
        </InfiniteScroll>
      )}
      {apiError && <Error />}

      {/* Modal, to show a selected image on fullscreen */}
      <Modal
        backdrop={true}
        isOpen={modalIsOpen}
        toggle={zoomOut}
        role="dialog"
        fade
        centered
        size="xl"
      >
        <ModalHeader toggle={zoomOut} charCode="X" className="text-capitalize">
          {currentImageTag}
          <Button
            size="lg"
            color="link"
            data-toggle="tooltip"
            data-placement="top"
            title="Download Image"
          >
            <a
              href={currentImage}
              alt={currentImageTag}
              rel="noopener noreferrer"
              target="_blank"
            >
              <i className="fas fa-cloud-download-alt fa-2x"></i>
            </a>
          </Button>
        </ModalHeader>
        <ModalBody>
          {!modalLoading && <Loading modal={true} />}
          <img
            className="img-fluid"
            src={currentImage}
            onLoad={() => setModalLoading(true)}
            alt={currentImageTag}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ImagesList;
