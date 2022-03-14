const router = require('express').Router();
const pool = require('../db');
const authorize = require('../middleware/authorize');

router.get('/', authorize, async (req, res) => {
    try {
        const posts = await pool.query('SELECT id, title, description FROM posts WHERE user_id = $1;', [req.user]);
        
        res.json(posts.rows);
    } catch (err) {
        
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});

router.get('/post/:postId', authorize, async (req, res) => {
    try {
        const post = await pool.query('SELECT * FROM posts WHERE id = $1 AND user_id = $2;', [req.params.postId, req.user]);
        
        res.json(post.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});

router.delete('/delete/post/:postId', authorize, async (req, res) => {
    try {
        const deletedPost = (await pool.query("DELETE FROM posts WHERE user_id = $1 AND id = $2 RETURNING *;", [req.user, req.params.postId])).rows[0];
        
        res.json(deletedPost);
    } catch (err) {
        
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});

router.post('/', authorize, async (req, res) => {

    try {
        const insertedPost = (await pool.query("INSERT INTO posts (title, description, body, user_id) VALUES ($1, $2, $3, $4) RETURNING *;", [req.body.title, req.body.description, req.body.body, req.user])).rows[0];
        
        res.json(insertedPost);
    } catch (err) {
        
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});

router.patch('/update/post/:postId', authorize, async (req, res) => {
    try {
        const updatedPost = (await pool.query("UPDATE posts SET title = $1, description = $2, body = $3 WHERE id = $4 AND user_id = $5 RETURNING *;", [req.body.title, req.body.description, req.body.body, req.params.postId, req.user])).rows[0];
        
        res.json(updatedPost);
    } catch (err) {
        
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});

module.exports = router;