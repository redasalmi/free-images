import React from "react";
import { DropdownItem } from "reactstrap";
import { useDispatch } from "react-redux";
import { setImageCategorie } from "../actions/fetchImages";

const categorieList = [
  "all categories",
  "fashion",
  "nature",
  "backgrounds",
  "science",
  "education",
  "people",
  "feelings",
  "religion",
  "health",
  "places",
  "animals",
  "industry",
  "food",
  "computer",
  "sports",
  "transportation",
  "travel",
  "buildings",
  "business",
  "music"
];

const CategorieDropdown = () => {
  const dispatch = useDispatch();
  return categorieList.map(categorie => (
    <DropdownItem
      value={categorie}
      key={categorie}
      onClick={event => dispatch(setImageCategorie(event.target.value))}
      className="text-capitalize small-text"
    >
      {categorie}
    </DropdownItem>
  ));
};

export default CategorieDropdown;
