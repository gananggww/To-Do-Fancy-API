const ObjectId = require("mongodb").ObjectId
const modelUsers = require("../model/users")
const jwt = require('jsonwebtoken');

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

const getAll = (req, res)=>{
 modelUsers.find()
 .then(rows=>{
   res.send(rows)
 })
 .catch(err=>{
   res.send(err)
 })
}

const insert = (req, res)=>{
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


const remove = (req, res)=>{
  if(req.headers.token == null){
    res.send("maaf anda harus login")
  }else{
    var decoded = jwt.verify(req.headers.token,"shhhhh")
    if(decoded.id == ObjectId(req.params.id)){
      modelUsers.remove({_id: ObjectId(req.params.id)})
      .then(()=>{
        res.send("Berhasil menghapus")
      }).catch(err=>{
        res.send("Gagal menghapus")
      })
    }else{
      res.send("tidak punya hak untuk hapus")
    }
  }
}

const edit = (req, res)=>{
  modelUsers.update({_id: ObjectId(req.params.id)},{
    username : req.body.username,
    password : req.body.password,
    secret : req.body.secret
  })
  .then(()=>{
    res.send("Berhasil edit")
  })
  .catch(err=>{
    res.send("Gagal edit")
  })
}


module.exports = {
  login,
  getAll,
  insert,
  remove,
  edit,

}
