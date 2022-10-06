const Notification = ({message}) => {
  const notificationStyle = {
    color: 'green',
    fontSize: 20,
    padding: 10,
    background: 'lightGrey',
    border: 'solid'
  }

  if (message === null) {
    return
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification