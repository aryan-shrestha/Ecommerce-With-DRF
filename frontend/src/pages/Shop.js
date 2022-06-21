import React, { useEffect, useState } from "react";

import Card from "../components/Card";
import axios from "../utils/axios/axios";

import "../assets/css/shop.css";
import TitleBanner from "../components/TitleBanner";

function Shop() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [categories, setCategories] = useState([]);

  function fetchItems(url) {
    axios.get(url).then((res) => {
      setItems(res.data.results);
      setIsLoading(false);
    });
  }

  function getCategories() {
    axios.get("/item/category_list/").then((res) => {
      setCategories(res.data);
    });
  }

  useEffect(() => {
    fetchItems("/item/list");
    getCategories();
  }, []);

  function handleSearchKeywordChange(e) {
    setSearchKeyword(e.target.value);
  }

  function handleSearch() {
    fetchItems(`/item/list/?search=${searchKeyword}`);
  }

  function handleSorting(e) {
    e.preventDefault();
    let sort = e.target.sort.value;
    fetchItems(`/item/list/?ordering=${sort}`);
  }

  function handleCategory(category_id) {
    console.log(category_id);
    fetchItems(`/item/list/?category=${category_id}`);
  }

  return (
    <div className="product-page">
      <TitleBanner url={"/shop"} currentPage={"Shop"} />

      <div className="m-10 m-auto mx-width shop-wrapper">
        <div className="col-flex-3">
          <div className="filter-container mx-width m-auto">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search..."
                value={searchKeyword}
                onChange={handleSearchKeywordChange}
              />
              <i
                className="fas fa-search"
                style={{ cursor: "pointer", transform: "scale(1.3)" }}
                onClick={handleSearch}
              ></i>
            </div>
            <form className="price-filter" onSubmit={handleSorting}>
              <label
                htmlFor="filter"
                style={{ alignSelf: "center", marginRight: "10px" }}
              >
                Price
              </label>
              <select id="filter" name="sort">
                <option value="price">low to high </option>
                <option value="-price">high to low</option>
              </select>
              <button
                type="submit"
                style={{ marginLeft: "10px", padding: "5px 10px" }}
              >
                Filter
              </button>
            </form>
          </div>

          <div className="item-card-container">
            {isLoading && <p>Loading Items </p>}

            {items.map((item) => {
              return (
                <Card
                  src={item.image}
                  name={item.name}
                  price={item.price}
                  id={item.id}
                  key={item.id}
                />
              );
            })}
          </div>
        </div>

        <div className="col-flex-1">
          <div className="categories-container">
            <h3>Categories</h3>
            <ul className="categories">
              {categories.map((category) => {
                return (
                  <li key={category.id}>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleCategory(category.id);
                      }}
                    >
                      {category.name}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
