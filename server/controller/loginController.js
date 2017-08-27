const ObjectId = require("mongodb").ObjectId
const modelUsers = require("../model/users")

const login = (req, res)=>{
  modelUsers.findOne({username : req.body.username})
  .then(row=>{
    if(row.password == req.body.password) {
      var token = jwt.sign({ id: row._id, username : row.username }, 'shhhhh');
      res.send(token)
    }
    else{
      res.send("password salah")
    }
  })
  .catch(err=>{
    res.send("username tidak ditemukan")
  })
}

const register = (req, res)=>{
  modelUsers.create({
    username : req.body.username,
    password : req.body.password,
    secret : req.body.secret
  }).then(()=>{
    res.send("Berhasil menambahkan")
  })
  .catch(err=>{
    res.send("Gagal menambahkan")
  })
}

module.exports = {
  login,
  register
}
