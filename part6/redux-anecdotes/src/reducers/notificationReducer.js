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
const { add, remove } = notificationSlice.actions;

export default notificationSlice.reducer;

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(add(message));
    setTimeout(() => dispatch(remove()), time * 1000);
  };
};
