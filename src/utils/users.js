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

exports.module = {
  AddUser
}

AddUser({ id: 12, username:'Priyanka', room:'here'})

const res = AddUser({ id: 11, username:'Priyanka', room:'here'})
console.log(res)
