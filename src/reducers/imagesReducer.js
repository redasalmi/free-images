import {
  FETCH_IMAGES,
  SEARCH_IMAGES,
  SET_IMAGES_SEARCH,
  SET_IMAGES_TYPE,
  SET_IMAGES_CATEGORIE,
  SET_PAGE_NUMBER,
  IMAGE_LOADED,
  API_ERROR
} from "../actions/types";

const initialState = {
  images: [],
  imageSearch: "",
  imageType: "all",
  imageCategorie: "All Categories",
  pageNumber: 1,
  imageLoaded: false,
  apiError: false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_IMAGES:
      return { ...state, images: [...state.images, ...action.payload] };
    case SEARCH_IMAGES:
      return { ...state, images: action.payload };
    case SET_IMAGES_SEARCH:
      return { ...state, imageSearch: action.payload };
    case SET_IMAGES_TYPE:
      return { ...state, imageType: action.payload };
    case SET_IMAGES_CATEGORIE:
      return { ...state, imageCategorie: action.payload };
    case SET_PAGE_NUMBER:
      return { ...state, pageNumber: action.payload };
    case IMAGE_LOADED:
      return { ...state, imageLoaded: action.payload };
    case API_ERROR:
      return {
        ...state,
        images: [],
        imageLoaded: false,
        apiError: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;
