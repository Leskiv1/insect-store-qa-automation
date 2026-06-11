import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCarts, updateCartCount, deleteCart, deleteAllCarts } from "../api/api";

export const fetchCarts = createAsyncThunk("carts/fetchCarts", async () => {
  return await getCarts();
});

export const updateCount = createAsyncThunk("carts/updateCount", async ({ insect_id, count, year }) => {
  const { cart } = await updateCartCount({ insect_id, count, year });
  return cart;
});

export const removeCart = createAsyncThunk("carts/deleteCart", async (id) => {
  await deleteCart(id);
  return id;
});

export const removeAllCarts = createAsyncThunk("carts/deleteAllCarts", async () => {
  await deleteAllCarts();
});

const initialCartState = {
  carts: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCarts.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload;
      })
      .addCase(fetchCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCount.fulfilled, (state, action) => {
        const cart = action.payload;
        const existingCart = state.carts.find(
          (exCart) => exCart.insect.id === cart.insect.id && exCart.year === cart.year
        );
        if (existingCart) {
          existingCart.count = cart.count;
        } else {
          state.carts.push(cart);
        }
      })
      .addCase(updateCount.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removeCart.fulfilled, (state, action) => {
        const id = action.payload;
        state.carts = state.carts.filter((cart) => cart.id !== id);
      })
      .addCase(removeCart.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removeAllCarts.fulfilled, (state) => {
        state.carts = [];
      })
      .addCase(removeAllCarts.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
