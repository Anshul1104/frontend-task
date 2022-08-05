import { useEffect, useState } from "react";
import { instance } from "../api/axiosInstance";

const useFetchCategoryData = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    instance
      .get("categories")
      .then((resp) => {
        setCategories(resp.data?.categories);
        console.log(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return { categories, loading, setLoading };
};

export default useFetchCategoryData;
