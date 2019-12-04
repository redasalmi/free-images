import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Label,
  CustomInput
} from "reactstrap";
import CategorieDropdown from "./CategorieDropdown";
import {
  fetchImages,
  setImageSearch,
  setImageType,
  setPageNumber
} from "../actions/fetchImages";
import { useSelector, useDispatch } from "react-redux";

function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const [
    imageSearch,
    imageType,
    imageCategorie,
    pageNumber
  ] = useSelector(state => [
    state.images.imageSearch,
    state.images.imageType,
    state.images.imageCategorie,
    state.images.pageNumber
  ]);

  const handleSearch = event => {
    dispatch(setPageNumber(1));
    dispatch(
      fetchImages(imageType, imageCategorie, pageNumber, imageSearch, true)
    );
    event.preventDefault();
  };

  return (
    <div className="navBackImage pb-4">
      <Navbar className="navbar-dark" expand="md">
        <NavbarBrand href="/">
          <h2 className="mainTitle text-dark">Free Images</h2>
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem className="ml-2">
            <a
              href="https://github.com/redasalmi/free-images"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="fab fa-github fa-3x github text-dark"></span>
            </a>
          </NavItem>
        </Nav>
      </Navbar>

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
                value={imageSearch}
                onChange={event => dispatch(setImageSearch(event.target.value))}
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
                  {imageCategorie}
                </DropdownToggle>
                <DropdownMenu>
                  <CategorieDropdown />
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
                    onClick={() => dispatch(setImageType("all"))}
                  />
                  <CustomInput
                    className="ml-3 col-5 col-sm-3 col-md-2"
                    type="radio"
                    id="photo"
                    name="image_type"
                    label="Photo"
                    onClick={() => dispatch(setImageType("photo"))}
                  />
                  <CustomInput
                    className="ml-3 col-5 col-sm-3 col-md-2"
                    type="radio"
                    id="illustration"
                    name="image_type"
                    label="Illustration"
                    onClick={() => dispatch(setImageType("illustration"))}
                  />
                  <CustomInput
                    className="ml-3 col-5 col-sm-3 col-md-2"
                    type="radio"
                    id="vector"
                    name="image_type"
                    label="Vector"
                    onClick={() => dispatch(setImageType("vector"))}
                  />
                </div>
              </div>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
