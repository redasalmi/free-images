import React, { useState, useEffect } from "react";
import CategorieDropdown from "./CategorieDropdown";
import {
  Button,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Label,
  CustomInput,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import NavBar from "./NavBar";
import Loading from "./Loading";
import Error from "./Error";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

function ImageSearch() {
  // modal open/close variable
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // image search variable
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // image search categorie variable
  const [categorie, setCategorie] = useState("All Categories");
  // image search type variable
  const [imageType, setImageType] = useState("all");
  const [pageNumber, setPageNumber] = useState(1);
  // images list
  const [images, setImages] = useState([]);
  // imageLoaded boolean to show images once they are found
  const [imageLoaded, setImageIsLoaded] = useState(false);
  // currently selected image info
  const [currentImage, setCurrentImage] = useState("");
  const [currentImageTag, setCurrentImageTag] = useState("");
  // modal loading state
  const [modalLoading, setModalLoading] = useState(false);
  // error & end message handling
  const [error, setError] = useState(false);
  const [endMessage, setEndMessage] = useState("");

  // pixabay API information (api url, api key)
  var pixabayInfo = {
    apiUrl: "https://pixabay.com/api/",
    apiKey: process.env.REACT_APP_API_KEY
  };
  // default data fetching url
  var url = `${pixabayInfo.apiUrl}/?key=${pixabayInfo.apiKey}&safesearch=true&image_type=${imageType}`;

  // fetching latest images on page load
  useEffect(() => {
    fetchImage();
    // eslint-disable-next-line
  }, []);

  // search handling function
  function handleSearch(event) {
    let searchUrl = `${url}&page=${1}&q=${search}`;
    if (categorie !== "All Categories") {
      searchUrl = `${searchUrl}&category=${categorie}`;
    }
    axios
      .get(searchUrl)
      .then(res => {
        if (res.data.hits.length) {
          setPageNumber(2);
          setImages(res.data.hits);
          setImageIsLoaded(true);
        } else {
          setImages([]);
          setImageIsLoaded(false);
          setEndMessage("Sorry, No Images Found");
        }
      })
      .catch(err => {
        setError(true);
      });
    event.preventDefault();
  }

  const fetchImage = () => {
    setPageNumber(pageNumber + 1);
    let fetchUrl = `${url}&page=${pageNumber}`;
    if (search !== "") {
      fetchUrl = `${fetchUrl}&q=${search}`;
    }
    if (categorie !== "All Categories") {
      fetchUrl = `${fetchUrl}&category=${categorie}`;
    }
    axios
      .get(fetchUrl)
      .then(res => {
        if (res.data.hits.length) {
          setImages([...images, ...res.data.hits]);
          setImageIsLoaded(true);
        } else {
          setImageIsLoaded(false);
          setEndMessage("Sorry, No More Images Found");
        }
      })
      .catch(err => {
        setError(true);
      });
  };

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
  function zooomImg(img, imgTag) {
    setCurrentImageTag(imgTag);
    setCurrentImage(img);
    setModalIsOpen(true);
  }
  function zoomOut() {
    setCurrentImageTag("");
    setCurrentImage("");
    setModalLoading(false);
    setModalIsOpen(false);
  }

  return (
    // navbar + search form
    <div>
      <div className="navBackImage pb-4">
        <NavBar />
        <div className="container text-center" style={{ marginTop: "60px" }}>
          <div className="mb-4">
            <h5>
              All these images are brought to you by
              <a
                href="https://pixabay.com/"
                className="pixabay"
                rel="noopener noreferrer"
                target="_blank"
              >
                {" "}
                Pixabay
              </a>
            </h5>
            <h5>Click on an Image to see it on Fullscreen & Download it</h5>
            <h5>You can search for images by Categories & Types</h5>
          </div>

          <div className="col-12 offset-md-1 col-md-10">
            <Form onSubmit={handleSearch}>
              <InputGroup size="lg">
                <InputGroupAddon
                  addonType="prepend"
                  className="search-btn"
                  onClick={handleSearch}
                >
                  <InputGroupText className="bg-white">
                    <i className="fas fa-search"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="text"
                  name="image"
                  id="image_search"
                  placeholder="Search Images"
                  value={search}
                  onChange={event => setSearch(event.target.value)}
                />
              </InputGroup>

              <InputGroup className="mt-4">
                <p className="my-auto">Image Categorie:</p>
                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={() => setDropdownOpen(!dropdownOpen)}
                  style={{ marginLeft: "100px" }}
                >
                  <DropdownToggle caret className="text-capitalize">
                    {categorie}
                  </DropdownToggle>
                  <DropdownMenu>
                    <CategorieDropdown setCategorie={setCategorie} />
                  </DropdownMenu>
                </Dropdown>
              </InputGroup>

              <InputGroup className="mt-4">
                <Label for="image_type" className="mr-4">
                  Image Type:
                </Label>
                <div className="form-check container">
                  <div className="row">
                    <CustomInput
                      className="ml-3 col-5 col-sm-3 col-md-2"
                      type="radio"
                      id="all"
                      name="image_type"
                      label="All"
                      defaultChecked
                      onClick={() => setImageType("all")}
                    />
                    <CustomInput
                      className="ml-3 col-5 col-sm-3 col-md-2"
                      type="radio"
                      id="photo"
                      name="image_type"
                      label="Photo"
                      onClick={() => setImageType("photo")}
                    />
                    <CustomInput
                      className="ml-3 col-5 col-sm-3 col-md-2"
                      type="radio"
                      id="illustration"
                      name="image_type"
                      label="Illustration"
                      onClick={() => setImageType("illustration")}
                    />
                    <CustomInput
                      className="ml-3 col-5 col-sm-3 col-md-2"
                      type="radio"
                      id="vector"
                      name="image_type"
                      label="Vector"
                      onClick={() => setImageType("vector")}
                    />
                  </div>
                </div>
              </InputGroup>
            </Form>
          </div>
        </div>
      </div>

      <div>
        {/* InfiniteScroll, to scroll on fetched images */}
        {!error && (
          <InfiniteScroll
            dataLength={images}
            next={() => fetchImage()}
            hasMore={imageLoaded}
            loader={<Loading />}
            className="row m-1 justify-content-center"
            endMessage={<h2 className="font-weight-bold mt-5">{endMessage}</h2>}
          >
            {images.map((image, index) => (
              <PixabayImage img={image} key={index} />
            ))}
          </InfiniteScroll>
        )}
        {error && <Error />}

        {/* Modal, to show a selected image on fullscreen */}
        <Modal
          isOpen={modalIsOpen}
          toggle={zoomOut}
          role="dialog"
          fade
          centered
          size="xl"
        >
          <ModalHeader
            toggle={zoomOut}
            charCode="X"
            className="text-capitalize"
          >
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
            {!modalLoading && <Loading />}
            <img
              className="img-fluid"
              src={currentImage}
              onLoad={() => setModalLoading(true)}
              alt={currentImageTag}
            />
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}

export default ImageSearch;
