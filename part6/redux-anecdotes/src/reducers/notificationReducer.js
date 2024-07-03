import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "test message",
  reducers: {},
});

export default notificationSlice.reducer;
