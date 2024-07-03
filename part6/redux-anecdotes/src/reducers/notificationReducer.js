import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    add(state, action) {
      return action.payload;
    },
    remove() {
      return "";
    },
  },
});

export default notificationSlice.reducer;
