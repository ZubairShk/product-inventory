import { apiEndPoint } from "../../utils/commons";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(apiEndPoint + "getAll");
      let responseData = await response.data;
      if (response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct/",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(apiEndPoint + "addNew", payload);
      let responseData = await response.data;
      console.log("responseData", responseData);
      if (response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const editProduct = createAsyncThunk(
  "product/editProduct",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.put(apiEndPoint + "update", payload);
      let responseData = await response.data;
      console.log("responseData", responseData);
      if (response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const response = await axios.delete(apiEndPoint + "delete?id=" + payload);
      let responseData = await response.data;
      if (response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const productDetails = createSlice({
  name: "product",
  initialState: {
    /////// state for product details.
    isDetailSuccess: false,
    isDetailFailure: false,
    isLoading: false,
    errorDetailResponse: "",
    detailResponsData: [],

    ///// state for adding product details
    isPostSuccess: false,
    isPostfailure: false,
    failurePostResponse: "",
    successPostResponse: "",

    /////state for deleting product detail
    isDeleteSuccess: false,
    isDeleteFailure: false,
    deleteSuccessResponse: "",
    deleteFailureResponse: "",
  },
  reducers: {
    resetState: (state) => {
      state.isDetailSuccess = false;
      state.isDetailFailure = false;
      state.isLoading = false;
      state.errorDetailResponse = "";
      state.isPostSuccess = false;
      state.isPostfailure = false;
      state.failurePostResponse = "";
      state.successPostResponse = "";
      state.isDeleteSuccess = false;
      state.isDeleteFailure = false;
      state.deleteSuccessResponse = "";
      state.deleteFailureResponse = "";
    },
  },
  extraReducers: {
    [getProductDetails.fulfilled]: (state, { payload }) => {
      state.isDetailSuccess = true;
      state.isDetailFailure = false;
      state.isLoading = false;
      state.detailResponsData = payload.data;
    },
    [getProductDetails.pending]: (state) => {
      state.isDetailFailure = false;
      state.isLoading = true;
    },
    [getProductDetails.rejected]: (state, { payload }) => {
      state.isDetailSuccess = false;
      state.isLoading = false;
      state.isDetailFailure = true;
      state.errorDetailResponse = payload.message || "failed";
    },
    [addProduct.fulfilled]: (state, { payload }) => {
      state.isPostSuccess = true;
      state.isPostfailure = false;
      state.isLoading = false;
      state.failurePostResponse = "";
      console.log(payload);
      state.successPostResponse = payload.message;
    },
    [addProduct.pending]: (state) => {
      state.isPostSuccess = false;
      state.isPostfailure = false;
      state.isLoading = true;
      state.failurePostResponse = "";
    },
    [addProduct.rejected]: (state, { payload }) => {
      state.isPostSuccess = false;
      state.isPostfailure = true;
      state.isLoading = false;
      console.log(payload);
      state.failurePostResponse =
        payload.message || "something went wrong, please try again later";
    },
    [editProduct.fulfilled]: (state, { payload }) => {
      state.isPostSuccess = true;
      state.isPostfailure = false;
      state.isLoading = false;
      state.failurePostResponse = "";
      state.successPostResponse = payload.message;
    },
    [editProduct.pending]: (state) => {
      state.isPostSuccess = false;
      state.isPostfailure = false;
      state.isLoading = true;
      state.failurePostResponse = "";
    },
    [editProduct.rejected]: (state, { payload }) => {
      state.isPostSuccess = false;
      state.isPostfailure = true;
      state.isLoading = false;
      state.failurePostResponse =
        payload.message || "something went wrong, please try again later";
    },
    [deleteProduct.fulfilled]: (state, { payload }) => {
      state.isDeleteSuccess = true;
      state.isLoading = false;
      state.isDeleteFailure = false;
      state.deleteSuccessResponse = payload.message;
      state.deleteFailureResponse = "";
    },
    [deleteProduct.pending]: (state) => {
      state.isLoading = true;
      state.isDeleteFailure = false;
      state.isDeleteSuccess = false;
    },
    [deleteProduct.rejected]: (state, { payload }) => {
      state.isDeleteSuccess = false;
      state.isLoading = false;
      state.isDeleteFailure = true;
      state.deleteFailureResponse =
        payload.message || "something went wrong, please try again later";
    },
  },
});

export const { resetState } = productDetails.actions;

export const productSelector = (state) => state.product;
