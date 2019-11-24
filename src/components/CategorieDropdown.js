import React from "react";
import { DropdownItem } from "reactstrap";

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

const CategorieDropdown = ({ setCategorie }) =>
  categorieList.map(categorie => (
    <DropdownItem
      value={categorie}
      key={categorie}
      onClick={event => setCategorie(event.target.value)}
      className="text-capitalize small-text"
    >
      {categorie}
    </DropdownItem>
  ));

export default CategorieDropdown;
