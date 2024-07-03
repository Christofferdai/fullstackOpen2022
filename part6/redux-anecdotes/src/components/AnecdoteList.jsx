import { useSelector, useDispatch } from "react-redux";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter((a) =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    );
  });
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch({ type: "anecdote/vote", payload: anecdote.id });
    dispatch({
      type: "notification/add",
      payload: `you voted ${anecdote.content}`,
    });

    setTimeout(() => dispatch({ type: "notification/remove" }), 5000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
