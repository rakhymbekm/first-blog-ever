const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validate = require('../middleware/validate');
const authorize = require('../middleware/authorize');

router.post('/signup', validate, async (req, res) => {
    try {

        // 1 desctructure the request body

        const {name, email, password} = req.body;

        // 2 make sure the user with the same identity doesn't exist
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [
            email
        ]);

        if (user.rows.length !== 0) {
            // 401 means unathenticated
            return res.status(401).json('User already exist');
        }

        // 3 encrypt the password

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // 4 enter the new user inside the db
        const newUser = await pool.query('INSERT INTO users (nickname, email,  hash) VALUES ($1, $2, $3) RETURNING *;', [
            name, email, bcryptPassword
        ]);

        // 5 generate jwt token

        const token = jwtGenerator(newUser.rows[0].id);
        res.json({token});

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
});

router.post('/signin', validate, async (req, res) => {
    try {

        // 1 desctructure the request body
        const {email, password} = req.body;

        // 2 make sure the user with the given identity exists

        const user = await pool.query('SELECT * FROM users WHERE email=$1', [
            email
        ]);
        
        if (user.rows.length === 0) {
            // 401 means unathenticated
            return res.status(401).json("Password or email is incorrect");
        }

        // 3 check if incoming password is the same as the password in the db

        const validPassword = await bcrypt.compare(password, user.rows[0].hash);

        if (!validPassword) {
            return res.status(401).json("Password or email is incorrect");
        }

        // 4 give them the jwt
        const token = jwtGenerator(user.rows[0].id);
        res.json({token});

    } catch(err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
});

router.get('/verified', authorize, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})

module.exports = router;