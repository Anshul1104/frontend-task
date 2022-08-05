import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Products from "../Products/Products";

import { instance } from "../../api/axiosInstance";
import ProductDetail from "../Products/ProductDetail/ProductDetail";
import ProductContext from "../../context/pProvider";
import useFetchCategoryData from "../../utils/useCategoryHook";
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const Dashboard = () => {
  const { pId } = useContext(ProductContext);
  const { categories, loading, setLoading } = useFetchCategoryData();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [selectCategory, setSelectCategory] = useState("");

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    instance
      .get("products")
      .then((resp) => {
        setProducts(resp.data?.products);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const productsArr = [...products];
    if (searchInput) {
      const filteredData = products.filter((item) => {
        return item.name.toLowerCase().includes(searchInput.toLowerCase());
      });
      setFilteredProducts(filteredData);
    } else {
      setProducts(productsArr);
    }
  }, [searchInput]);

  useEffect(() => {
    const productsArr = [...products];
    if (selectCategory) {
      const filteredData = products.filter((item) => {
        return item.category.toLowerCase() === selectCategory.toLowerCase();
      });
      setFilteredProducts(filteredData);
    } else {
      setProducts(productsArr);
    }
  }, [selectCategory]);

  return (
    <main>
      <div className="flex justify-between items-center flex-wrap">
        <div className="search-box sm:w-5/12 w-full">
          <InputComponent
            type="text"
            placeholder="Search by name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="categories-box sm:w-2/12 w-7/12 flex justify-end">
          <select
            value={selectCategory}
            onChange={(e) => setSelectCategory(e.target.value)}
            placeholder="Categories"
            className="w-full"
          >
            <option value="">Categories</option>
            {categories?.map((option) => (
              <option key={option?._id} value={option?.name}>
                {option?.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="add-product-box fixed bottom-5 right-2 sm:right-4">
        <ButtonComponent
          className="btn secondary"
          onClick={() => navigate("/create-product")}
          title="+"
        />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Products
              products={
                searchInput.length > 1 || selectCategory
                  ? filteredProducts
                  : products
              }
              searchInput={searchInput}
              loading={loading}
            />
          }
        />
        <Route path={`/product-detail/${pId}`} element={<ProductDetail />} />
      </Routes>
    </main>
  );
};

export default Dashboard;
