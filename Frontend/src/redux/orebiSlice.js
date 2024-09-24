import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { baseURL, MSG_VAR } from "../constants";

const initialState = {
  userInfo: [],
  products: [],
  checkedBrands: [],
  checkedCategorys: [],
  allProducts:[],
  driverList: [],
  customerOrders: [],
  Users: [],
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
      // Dispatch a success toast
      toast.success("Product added to cart");
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
        // Dispatch a success toast
      }
    },
    drecreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
        // Dispatch a success toast
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
      // Dispatch a success toast
      toast.error("Product removed from cart");
    },
    resetCart: (state) => {
      state.products = [];
      // Dispatch a success toast
    },

    toggleBrand: (state, action) => {
      const brand = action.payload;
      const isBrandChecked = state.checkedBrands.some(
        (b) => b._id === brand._id
      );

      if (isBrandChecked) {
        state.checkedBrands = state.checkedBrands.filter(
          (b) => b._id !== brand._id
        );
      } else {
        state.checkedBrands.push(brand);
      }
    },

    toggleCategory: (state, action) => {
      const category = action.payload;
      const isCategoryChecked = state.checkedCategorys.some(
        (b) => b._id === category._id
      );

      if (isCategoryChecked) {
        state.checkedCategorys = state.checkedCategorys.filter(
          (b) => b._id !== category._id
        );
      } else {
        state.checkedCategorys.push(category);
      }
    },
    setProduct(state, action){
         state.allProducts = action.payload
    },
    setDrivers: (state, action) => {
      state.driverList = action.payload
    },
    setOrders: (state, action) => {
      const data = action.payload
      state.customerOrders = data
    },
    setUsers: (state, action) => {
      const data = action.payload
      state.Users = data
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
  toggleBrand,
  toggleCategory,
  setProduct,
  setDrivers,
  setOrders,
  setUsers
} = orebiSlice.actions;
export default orebiSlice.reducer;

export function getAllProducts(){
  return async function getProductThunk(dispatch, getState){
     try {
      const resp = await fetch(`${baseURL}/api/product`)
      const data = await resp.json()

      if(data.status === MSG_VAR.OK){
         dispatch(setProduct(data.data.data.products))
      }else{
        console.log(data.message)
      }
     } catch (error) {
       console.log(error); 
     }  
  }
}

export function getDrivers(){
  return async function getDriverThunk(dispatch, getState){
     try {
      const resp = await fetch(`${baseURL}/api/farmer/hire-drivers`)
      const data = await resp.json()

      if(data.status === MSG_VAR.OK){
         dispatch(setDrivers(data.data))
      }else{
        console.log(data.message)
      }
     } catch (error) {
       console.log(error); 
     }  
  }
}

export function getOrders(){
  return async function getOrderThunk(dispatch, getState){
     try {
      const resp = await fetch(`${baseURL}/api/farmer/customers/orders`)
      const data = await resp.json()

      if(data.status === MSG_VAR.OK){
         dispatch(setOrders(data.data.data))
      }else{
        console.log(data.message)
      }
     } catch (error) {
       console.log(error); 
     }  
  }
}

export function getUsers(){
  return async function getAllUsers(dispatch, getState){
     try {
      const resp = await fetch(`${baseURL}/api/admin/users`)
      const data = await resp.json()

      if(data.status === MSG_VAR.OK){
         dispatch(setUsers(data.users))
      }else{
        console.log(data.message)
      }
     } catch (error) {
       console.log(error); 
     }  
  }
}
