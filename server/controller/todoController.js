const ObjectId = require("mongodb").ObjectId
const modelTodos = require("../model/todos")
const jwt = require('jsonwebtoken');


const getAll = (req, res)=>{
 modelTodos.find()
 .then(rows=>{
   res.send(rows)
 })
 .catch(err=>{
   res.send(err)
 })
}

const insert = (req, res)=>{
  if(req.headers.token == null){
    res.send("maaf anda harus login")
  }else{
    var decoded = jwt.verify(req.headers.token,"shhhhh")
    if(decoded.id == ObjectId(req.params.id)){
      modelTodos.create({
        kegiatan : req.body.kegiatan,
        deskripsi : req.body.deskripsi,
        status : req.body.status
      }).then(()=>{
        res.send("Berhasil menambahkan")
      })
      .catch(err=>{
        res.send("Gagal menambahkan")
      })
    }else{
      res.send("tidak punya hak untuk membuat todo")
    }
  }
}

const remove = (req, res)=>{
  if(req.headers.token == null){
    res.send("maaf anda harus login")
  }else{
    var decoded = jwt.verify(req.headers.token,"shhhhh")
    if(decoded.id == ObjectId(req.params.id)){
      modelTodos.remove({_id: ObjectId(req.params.id)})
      .then(()=>{
        res.send("Berhasil menghapus")
      }).catch(err=>{
        res.send("Gagal menghapus")
      })
    }else{
      res.send("tidak punya hak untuk menghapus todo")
    }
  }
}

const edit = (req, res)=>{
  if(req.headers.token == null){
    res.send("maaf anda harus login")
  }else{
    var decoded = jwt.verify(req.headers.token,"shhhhh")
    if(decoded.id == ObjectId(req.params.id)){
      modelTodos.update({_id: ObjectId(req.params.id)},{
        kegiatan : req.body.kegiatan,
        deskripsi : req.body.deskripsi,
        status : req.body.status
      })
      .then(()=>{
        res.send("Berhasil edit")
      })
      .catch(err=>{
        res.send("Gagal edit")
      })
    }else{
      res.send("tidak punya hak untuk edit todo")
    }
  }
}
module.exports = {
  getAll,
  insert,
  remove,
  edit
}
