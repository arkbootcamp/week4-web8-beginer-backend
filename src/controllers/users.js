const login = (req, res) => {
  res.send('ini login')
}

const register = (req, res) => {
  res.send('ini register terpanggil')
}

const getAllUser = (req, res) => {
  res.send('tampil semua user')
}

module.exports ={
  login,
  register,
  getAllUser
}