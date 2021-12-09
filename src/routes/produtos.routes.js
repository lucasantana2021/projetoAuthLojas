const express = require('express')
const router = express.Router()
const controller = require('../controllers/produtoController')

//listar todos os produtos/get/find
router.get('/', controller.getAll)

//criar um novo produto/post/save
router.post('/', controller.createProduto)


//atualizar uma informacao especifica num produto/patch/findById/save
router.put('/update', controller.updateOneProduto)

//deletar um produto/delete/findById/remove
router.delete('/delete', controller.deleteOneProduto)

//listar um produto/get/findById
router.get('/:id', controller.ProcurarId)

module.exports = router