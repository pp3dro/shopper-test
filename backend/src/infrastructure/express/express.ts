import ProductControllerInterface from "../../application/controllers/product.interface"

const express = require('express')
const fileUpload = require('express-fileupload');
const cors = require('cors')

export const server = (productController: ProductControllerInterface): void => {

  const app = express()
  const port = 3000

  app.use(express.json(), fileUpload())
  app.use(cors({origin: process.env.ALLOWED_ORIGIN}))
  
  app.post('/products/prices/validate', (req, res) => productController.validatePrices(req, res))
  app.post('/products/prices/update', (req, res) => productController.updatePrices(req, res))
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}


