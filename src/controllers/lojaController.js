const mongoose = require('mongoose')
const Loja = require('../models/loja')
const jwt = require('jsonwebtoken')
const produto = require('../models/produto')

const SECRET = process.env.SECRET


const getAll = async (req, res) => {
  const authHeader = req.get('authorization');
  const token = authHeader.split(' ')[1]
  // console.log(token)

  if (!token) {
    return res.status(403).send({message: "Kd a tokenzinnn"})
  }
  // usar método do jwt para autenticar a rota
    // verificação do token com o SECRET do projeto
  jwt.verify(token, SECRET, async (err) => {
    if (err) {
      res.status(403).send({ message: 'Token não válido', err})
    }

    const lojas = await Loja.find()
    res.json(lojas)
  })
}

const createLoja = async (req, res) => {
  const loja = new Loja({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    criadoEm: req.body.criadoEm,
  })
  const lojaJaExiste = await Loja.findOne({nome: req.body.nome})
  if (lojaJaExiste) {
    return res.status(409).json({error: 'Loja ja cadastrado.'})
  }
  try{
    const novaLoja = await loja.save()
    res.status(201).json(novaLoja)
  } catch(err) {
    res.status(400).json({ message: err.message})
  }
}

const updateOneLoja = async (req, res) => {

  const id = req.body._id
  const nome = req.body.nome

  Loja.updateOne({ _id: id }, {
    $set: {
      nome: nome
    }
  }, (err, result) => {
    if(err) return res.send(err)

    res.status(200).json({ message: 'Loja atualizado com sucesso'})
  
  })
}

const deleteOneLoja = async (req, res) => {

  const id = req.body._id

  Loja.deleteOne({ _id: id }, {
    
  }, (err, result) => {
    if(err) return res.send(err)

    res.status(200).json({ message: 'Loja excluido com sucesso'})
  
  })
}

const ProcurarId = async (req, res) => {
  const id = req.params.id
  Loja.findById(id)
    .then((loja) => {
      res.status(200).json(loja);
  })
  .catch(err => next(err));
}




module.exports = {
  getAll,
  createLoja,
  updateOneLoja,
  deleteOneLoja,
  ProcurarId
}