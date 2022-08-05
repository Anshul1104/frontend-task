import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoaderComponent from "../../components/LoaderComponent/LoaderComponent";
import ProductContext from "../../context/pProvider";
import classes from "./Products.module.css";

const Products = ({ products, searchInput, loading }) => {
  const navigate = useNavigate();
  const { setPId } = useContext(ProductContext);

  const productHandler = (id) => {
    setPId(id);
    navigate(`/product-detail/${id}`);
  };

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <section
      className={`${classes.products_section} flex flex-wrap justify-between`}
    >
      {products?.length < 1 && searchInput && "No product found"}
      {products?.map((product) => (
        <div
          key={product?._id}
          onClick={() => productHandler(product?._id)}
          className="sm:w-4/12 sm:pr-3"
        >
          <div className={classes.product_box}>
            <div className="img-box">
              <img src={product?.avatar} alt={product?.name} />
            </div>
            <div className="text-center my-3">
              <h5>{product?.name}</h5>
              <h6 className="font-bold">${product?.price}</h6>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Products;
