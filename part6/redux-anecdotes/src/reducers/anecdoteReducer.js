import { createSlice } from "@reduxjs/toolkit";
import apiServices from "../services/anecdotes";

// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart
//   .map(asObject)
//   .sort((a, b) => b.votes - a.votes);

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    append(state, action) {
      state.push(action.payload);
    },
    vote(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state
        .map((a) => (a.id !== id ? a : changedAnecdote))
        .sort((a, b) => b.votes - a.votes);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export default anecdoteSlice.reducer;
export const { append, setAnecdotes, vote } = anecdoteSlice.actions;

export const initializeState = () => {
  return async (dispatch) => {
    const anecdotes = await apiServices.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const add = (content) => {
  return async (dispatch) => {
    const newAnecdote = await apiServices.createNew(content);
    dispatch(append(newAnecdote));
  };
};

export const addVote = (id) => {
  return async (dispatch) => {
    await apiServices.vote(id);

    dispatch(vote(id));
  };
};
