const generatelocationMessage = (url) => {
  return {
    location: url,
    createdAt: new Date().getTime()
  }
}

module.exports = { generatelocationMessage
};
