const mongoose = require('mongoose')

const produtosSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nome: {
    type: String,
    required: true
  },
  marca: {
    type: String,
    required: true
  },
  preco: {
    type: Number,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  loja: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'loja'
  },
  validade: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('produto', produtosSchema)