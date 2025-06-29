const express = require('express');
const { User, Product } = require('../../models/product');
const router = express.Router();

router.get('/findUserById', async (req, res) => {
    const id = req.query.id;
    if (!id || id.length != 24) {
        return res.render('getUser', { User: null });
    }
    await User.findById(id).then((result) => {
        if (result) {
            if (result.Blocked === true) {
                return res.render('blockedPage');
            }
        }
        res.render('getUser', { User: result });
    })
        .catch(err => console.log(err));
})
router.get('/findUserByName', async (req, res) => {
    const name = req.query.name;
    await User.findOne({ Name: name }).then((result) => {
        if (result) {
            if (result.Blocked === true) {
                return res.render('blockedPage');
            }
        }
        res.render('getUser', { User: result });
    })
        .catch(err => console.log(err));
})
router.get('/findUserByEmail', async (req, res) => {
    const email = req.query.email;
    await User.findOne({ Email: email }).then((result) => {
        if (result) {
            if (result.Blocked === true) {
                return res.render('blockedPage');
            }
        }
        res.render('getUser', { User: result });
    })
        .catch(err => console.log(err));
})
router.get('/BlockUserById', async (req, res) => {
    const id = req.query.blockid;
    if (!id || id.length != 24) {
        return res.render('getUser', { User: null });
    }
    await User.findByIdAndUpdate(id, { Blocked: true }).then((result) => {
        res.render('blockedPage');
    })
        .catch(err => console.log(err));
})
router.delete("/DeleteUserById/:id", async (req, res) => {
    id = req.params.id;
    if (!id || id.length != 24) {
        return res.render('getUser', { User: null });
    }
    await User.findByIdAndDelete(id).then((result) => {
        console.log("user is deleted");
        res.json({ redirect: "/" });
    })
        .catch(err => console.log(err));
})

module.exports = router;