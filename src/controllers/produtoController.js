const mongoose = require('mongoose')
const Produto = require('../models/produto')


const getAll = async (req, res) => {
  const produtos = await Produto.find().populate('loja')
  res.status(200).json(produtos)
}

const createProduto = async (req, res) => {
  const produto = new Produto({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    marca: req.body.marca,
    preco: req.body.preco,
    descricao: req.body.descricao,
    loja: req.body.loja,
    validade: req.body.validade
  })
  //TODO : criar validação se filme já existe
  try {
    const novoProduto = await produto.save()
    res.status(201).json(novoProduto)
  } catch (err) {
    res.status(400).json({ message: err.message})
  }
}

const updateOneProduto = async (req, res) => {

  const id = req.body._id
  const nome = req.body.nome

  Produto.updateOne({ _id: id }, {
    $set: {
      nome: nome
    }
  }, (err, result) => {
    if(err) return res.send(err)

    res.status(200).json({ message: 'Produto atualizado com sucesso'})
  
  })
}

const deleteOneProduto = async (req, res) => {

  const id = req.body._id

  Produto.deleteOne({ _id: id }, {
    
  }, (err, result) => {
    if(err) return res.send(err)

    res.status(200).json({ message: 'Produto excluido com sucesso'})
  
  })
}

const ProcurarId = async (req, res) => {
  const id = req.params.id
  Produto.findById(id)
    .then((produto) => {
      res.status(200).json(produto);
  })
  .catch(err => next(err));
}

module.exports = {
  getAll,
  createProduto,
  updateOneProduto,
  deleteOneProduto,
  ProcurarId
}