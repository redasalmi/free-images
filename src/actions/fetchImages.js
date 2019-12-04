import {
  FETCH_IMAGES,
  SEARCH_IMAGES,
  SET_IMAGES_SEARCH,
  SET_IMAGES_TYPE,
  SET_IMAGES_CATEGORIE,
  SET_PAGE_NUMBER,
  IMAGE_LOADED,
  API_ERROR
} from "./types";
import axios from "axios";

// pixabay API information (api url, api key)
const pixabayInfo = {
  apiUrl: "https://pixabay.com/api/",
  apiKey: process.env.REACT_APP_API_KEY
};

export const fetchImages = (
  imageType,
  imageCategorie,
  pageNumber,
  search,
  resetImages
) => dispatch => {
  let fetchUrl = `${pixabayInfo.apiUrl}/?key=${pixabayInfo.apiKey}&safesearch=true&image_type=${imageType}&category=${imageCategorie}&page=${pageNumber}`;
  if (search !== "") {
    fetchUrl = `${fetchUrl}&q=${search}`;
  }
  axios
    .get(fetchUrl)
    .then(res => {
      if (resetImages) {
        dispatch({
          type: SEARCH_IMAGES,
          payload: res.data.hits
        });
      } else {
        dispatch({
          type: FETCH_IMAGES,
          payload: res.data.hits
        });
      }
      if (res.data.hits.length > 0) {
        dispatch({
          type: IMAGE_LOADED,
          payload: true
        });
      } else {
        dispatch({
          type: IMAGE_LOADED,
          payload: false
        });
      }
    })
    .catch(() => {
      dispatch({ type: API_ERROR, payload: true });
    });
  return;
};

export const setImageSearch = imageSearch => dispatch => {
  dispatch({
    type: SET_IMAGES_SEARCH,
    payload: imageSearch
  });
};

export const setImageType = imageType => dispatch => {
  dispatch({
    type: SET_IMAGES_TYPE,
    payload: imageType
  });
};

export const setImageCategorie = imageCategorie => dispatch => {
  dispatch({
    type: SET_IMAGES_CATEGORIE,
    payload: imageCategorie
  });
};

export const setPageNumber = pageNumber => dispatch => {
  dispatch({
    type: SET_PAGE_NUMBER,
    payload: pageNumber
  });
};

export const apiError = () => dispatch => {
  dispatch({
    type: API_ERROR,
    payload: true
  });
};
