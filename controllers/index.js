const { User } = require('../models');

const createUser = async (req, res) => {
    try {
        console.log('something went right')
        console.log(req.body)
        const user = await User.create(req.body);
        return res.status(201).json({
            user,
        });
    } catch(error) {
        console.log('something went wrong')
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createUser,
}