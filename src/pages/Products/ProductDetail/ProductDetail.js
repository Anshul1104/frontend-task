import React, { useContext, useEffect, useState } from "react";
import { instance } from "../../../api/axiosInstance";
import ProductContext from "../../../context/pProvider";
import classes from "./ProductDetail.module.css";
import LoaderComponent from "../../../components/LoaderComponent/LoaderComponent";

const ProductDetail = () => {
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const { pId } = useContext(ProductContext);

  useEffect(() => {
    setLoading(true);
    async function fetchProductHandler() {
      await instance
        .get(`/products/${pId}`)
        .then((resp) => {
          console.log(resp.data.product);
          setProductDetails(resp.data.product);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    if (pId) {
      fetchProductHandler();
    }
  }, [pId]);

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <section className={`${classes.product_detail_section} mt-10`}>
      <div className="flex flex-wrap">
        <div className="sm:w-5/12 w-full">
          <div className="img-box">
            <img src={productDetails?.avatar} alt={productDetails?.name} />
          </div>
        </div>
        <div className="sm:pl-4 my-3 sm:w-7/12 w-full flex flex-col justify-between text-center sm:text-left">
          <h1 className="font-bold text-5xl">{productDetails?.name}</h1>
          <h2>${productDetails?.price}</h2>
        </div>
      </div>
      <hr className="horizontal-line my-6 mx-2" />
      <p>{productDetails?.description}</p>
    </section>
  );
};

export default ProductDetail;
