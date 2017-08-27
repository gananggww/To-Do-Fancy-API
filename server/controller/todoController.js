const ObjectId = require("mongodb").ObjectId
const modelTodos = require("../model/todos")


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
}

const remove = (req, res)=>{
  modelTodos.remove({_id: ObjectId(req.params.id)})
  .then(()=>{
    res.send("Berhasil menghapus")
  }).catch(err=>{
    res.send("Gagal menghapus")
  })
}

const edit = (req, res)=>{
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
}
module.exports = {
  getAll,
  insert,
  remove,
  edit
}
