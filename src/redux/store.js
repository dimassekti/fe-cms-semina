import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categories/reducer";
import notifReducer from "./notif/reducer";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    notif: notifReducer,
  },
});

export default store;

//reducer sebagai tempat penampungan
//semua state akan ditampung disini
//misal state kategor i
