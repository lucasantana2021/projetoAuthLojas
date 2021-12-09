const express = require('express')
const router = express.Router()
const controller = require('../controllers/lojaController')

//listar todas as loja/get/find
router.get('/', controller.getAll)

//criar uma nova loja/post/save
router.post('/', controller.createLoja)


//atualizar uma informacao especifica numa loja/patch/findById/save
router.put('/atualizar', controller.updateOneLoja)


//deletar uma loja/delete/findById/remove
router.delete('/delete', controller.deleteOneLoja)

//listar uma loja/get/findById
router.get('/:id', controller.ProcurarId)

module.exports = router