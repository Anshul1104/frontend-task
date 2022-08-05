import { createContext, useState } from "react";

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [pId, setPId] = useState("");
  return (
    <ProductContext.Provider value={{ pId, setPId }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
