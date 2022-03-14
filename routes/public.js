const router = require('express').Router();
const pool = require('../db');
const path = require('path');

router.get('/', async (req, res) => {
    try {        
        const posts = await pool.query('SELECT u.nickname, p.id, p.title, p.description FROM users AS u JOIN posts AS p ON p.user_id = u.id ORDER BY u.nickname LIMIT 10;');
        
        res.json(posts.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});

router.get('/posts/:limit', async (req, res) => {
    try {        
        const posts = await pool.query('SELECT u.nickname, p.id, p.title, p.description FROM users AS u JOIN posts AS p ON p.user_id = u.id ORDER BY u.nickname LIMIT ' + req.params.limit);
        
        res.json(posts.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});

router.get('/post/:postId', async (req, res) => {
    try {
        const posts = await pool.query('SELECT p.title, p.body, u.nickname FROM posts AS p JOIN users AS u ON p.user_id=u.id WHERE p.id=$1;', [req.params.postId]);
        if (posts.rows.length !== 0){
            res.json(posts.rows);
        } else {
            res.status(404).json('Post Not Found');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});

router.get("*", async (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

module.exports = router;