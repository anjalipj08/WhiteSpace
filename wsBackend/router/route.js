const express = require('express')
const userController = require('../controllers/userController')
const resourceController = require('../controllers/resourceController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multerConfig = require('../middleware/multerMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

const route = express.Router()

route.post('/register', userController.userRegister)

route.post('/login', userController.userLogin)

route.post('/addResource', multerConfig.array('UploadedImages',3), jwtMiddleware, resourceController.addResource)

route.get('/getAllResource',jwtMiddleware, resourceController.getAllResource)

route.get('/getLatestResource',jwtMiddleware, resourceController.getLatestResource)

route.get('/viewResource/:id',jwtMiddleware,resourceController.viewResource)

route.get('/getResource',jwtMiddleware,resourceController.getResource)

//Update, get advertisers
route.put('/updateUser',jwtMiddleware,multerConfig.single('profile'),userController.updateUser)
route.get('/getAdvertiser',jwtMiddleware,userController.getAdvertiser)

route.put('/makePayment',jwtMiddleware,resourceController.buyResource)

route.get('/getBuyResource', jwtMiddleware, resourceController.getBuyResource);
route.post( '/addReview', jwtMiddleware, resourceController.addReview)

route.delete('/deleteResource/:id',jwtMiddleware,resourceController.deleteResource)

//admin side :getusersdata, get resource, admin data
route.get('/getAllUsers',adminMiddleware,userController.getAllUsers)
route.get('/getAllResource',adminMiddleware,resourceController.getAllResource)
route.get('/getAdmin',userController.getAdmin)

module.exports = route