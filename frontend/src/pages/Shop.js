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
  const [nextPageUrl, setnextPageUrl] = useState("");
  const [prevPageUrl, setPrevPageUrl] = useState("");

  function fetchItems(url) {
    axios.get(url).then((res) => {
      setItems(res.data.results);

      /* Checking if the previous page url is null or not. If it is not null, it will set the previous
    page url to the url. If it is null, it will set the previous page url to null. */
      if (res.data.previous != null) {
        let prevUrl = res.data.previous.substr(21);
        setPrevPageUrl(prevUrl);
      } else {
        setPrevPageUrl(null);
      }

      /* This is checking if the next page url is null or not. If it is not null, it will set the next
     page url to the url. If it is null, it will set the next page url to null. */
      if (res.data.next != null) {
        let nextUrl = res.data.next.substr(21);
        setnextPageUrl(nextUrl);
      } else {
        setnextPageUrl(null);
      }

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

  function handleNextPage(nextPageUrl) {
    fetchItems(nextPageUrl);
  }

  function handlePrevPage(prevPageUrl) {
    fetchItems(prevPageUrl);
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

      {prevPageUrl == "" || prevPageUrl !== null ? (
        <button
          className="btn"
          style={{
            marginTop: "20px",
            cursor: "pointer",
            position: "absolute",
            right: "50%",
            backgroundColor: "#292C2F",
            color: "#fff",
          }}
          onClick={() => {
            handlePrevPage(prevPageUrl);
          }}
        >
          Previous Page
        </button>
      ) : (
        ""
      )}

      {nextPageUrl == "" || nextPageUrl !== null ? (
        <button
          className="btn"
          style={{
            marginTop: "20px",
            cursor: "pointer",
            position: "absolute",
            right: "40%",
            backgroundColor: "#292C2F",
            color: "#fff",
          }}
          onClick={() => {
            handleNextPage(nextPageUrl);
          }}
        >
          Next Page
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default Shop;
