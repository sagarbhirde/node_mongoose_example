const express = require('express')
const router = express.Router()
const Accounts = require('../models/accounts')

//getting all data
router.get('/', async (req, res) => {
    try {
        const accounts = await Accounts.find()
        res.json(accounts)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})

//getting one data
router.get('/:id', getAccount ,(req, res) => {
    res.json(res.accounts)
})

//creating data
router.post('/', async (req, res) => {
    const accounts = new Accounts({
        account_id: req.body.account_id,
        limit: req.body.limit,
        products: req.body.products
    })
    try {
        const newAccount = await accounts.save()
        res.status(201).json(newAccount)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

//updating exisiting data
router.patch('/:id', getAccount, async (req, res) => {
    res.accounts.limit = req.body.limit
    try {
        const updateAccount = await res.accounts.save()
        res.json(updateAccount)
    } catch (error) {
        res.status(400).json({ message :error.message})
    }
 }

)
//delete data
router.delete('/:id', getAccount, async (req, res) => { 
try {
    await  Accounts.deleteOne({ _id: req.params.id })
            res.json({message : "Deleted account"}) 
} catch (error) {
   res.status(500).json({message : error.message}) 
}
}
)

async function getAccount(req,res,next){
    let accounts
    try{
        accounts = await Accounts.findById(req.params.id)
        if(accounts == null){
            return res.status(404).json({message : 'cannot find account'})
        }
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
    res.accounts = accounts
    next()
}

module.exports = router
