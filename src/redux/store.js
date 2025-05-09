import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categories/reducer";
import notifReducer from "./notif/reducer";
import authReducer from "./auth/reducer";
import talentsReducer from "./talents/reducer";
import listsReducer from "./lists/reducer";
import eventsReducer from "./events/reducer";
import paymentsReducer from "./payments/reducer";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    notif: notifReducer,
    auth: authReducer,
    talents: talentsReducer,
    lists: listsReducer,
    events: eventsReducer,
    payments: paymentsReducer,
  },
});

export default store;

//reducer sebagai tempat penampungan
//semua state akan ditampung disini
//misal state kategor i
