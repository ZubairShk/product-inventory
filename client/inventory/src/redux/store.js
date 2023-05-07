import { configureStore } from "@reduxjs/toolkit";
import { productDetails } from "./slices/productDetails";

export default configureStore({
  reducer: {
    product: productDetails.reducer,
  },
});
