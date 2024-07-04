import { useDispatch } from "react-redux";
import apiServices from "../services/anecdotes";
import { add } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";
    const anecdote = await apiServices.createNew(content);
    dispatch(add(anecdote));
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
