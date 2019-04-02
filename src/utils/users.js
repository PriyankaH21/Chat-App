const users = [];

const AddUser = ({id, username, room}) => {
  username = username.trim().toLowerCase()
  room = room.trim().toLowerCase()

  //validate data
  if ( !username || !room){
    return {
      error: "Username and room are required fields!"
    }
  }
  // check for existing users
  const existingUser = users.find((user) => {
   return user.username === username && user.room === room
 })
  //Validate Username
  if ( existingUser ) {
    return {
      error: "Username is already taken!"
    }
  }
  //Store user if it does not already existing
  const user = { id, username, room}
  users.push(user)
  return {user}
}

const RemoveUser = (id) => {
  const index = users.findIndex((user) => user.id === id)

  if ( index != -1 ){
    return (users.splice(index,1)[0])
  }
}

const getUser = (id) => {
  const user = users.find((user) => user.id === id)
  if (!user){
    return {
      error:'No user with id found!'
    }
  }
  return {user}
}

const getUsersinRoom = (room) => {
  return users.filter((user) => user.room === room)
}
module.exports = {
  AddUser,
  RemoveUser,
  getUser,
  getUsersinRoom
}
