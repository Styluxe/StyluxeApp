import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    loginModalOpen: false,
    userData: null,
    authKey: null,
    cartCount: 0,
  },
  reducers: {
    setLoginModalOpen: (state, action) => {
      state.loginModalOpen = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setAuthKey: (state, action) => {
      state.authKey = action.payload;
    },
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
  },
});

export const { setLoginModalOpen, setUserData, setAuthKey, setCartCount } =
  appSlice.actions;

export const loginModalState = (state) => state.app.loginModalOpen;
export const userDataState = (state) => state.app.userData;
export const authKeyState = (state) => state.app.authKey;
export const cartCountState = (state) => state.app.cartCount;

export default appSlice.reducer;
