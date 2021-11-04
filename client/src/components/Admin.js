import React, {Fragment, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import './Admin.css';

const Admin = ({setShowModal, delPostId, setDelPostId, setEditPostId}) => {
    const [posts, setPosts] = useState([]);
    const history = useHistory();

    async function getPosts() {
        try {
            if (localStorage.getItem('token') !== null) {
                const res = await fetch("http://localhost:5000/admin", {
                    method: "GET",
                    headers: {
                        token: localStorage.getItem('token'),
                        "Content-Type": "application/json"
                    }
                });

                if (res.status === 200) {
                    const parsedRes = await res.json();
                    setPosts(parsedRes);
                }
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => getPosts(),[delPostId]);

    function showDelWarn(postId) {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        document.querySelector('html').classList.add('show-modal');
        document.querySelector('body').classList.add('show-modal');
        setDelPostId(postId);
        setShowModal(true);
    }

    function goToEdit(postId) {
        setEditPostId(postId);
        history.push("/edit");
    }

    return (
        <Fragment>
            <h1 className="main-content-heading">Әкімнің басты беті</h1>
            <section className="posts">
				<h1 className="posts-heading">Посттар</h1>
                <ul className="post-list">
                    {
                        posts.map(
                            (post, i) => 
                                <li key={i} className="post-list-item">
                                    <article className="post">
                                        <header className="post-header">
                                            <h1 className="post-title">
                                                <button onClick={() =>goToEdit(post.id)} className="post-title-btn">{post.title}</button>
                                            </h1>
                                            <ul className="post-btn-list">
                                                <li className="post-btn-list-item">
                                                    <button onClick={() =>goToEdit(post.id)} className="post-ctrl-btn post-edit-btn">&#9998;</button>
                                                </li>
                                                <li className="post-btn-list-item">
                                                    <button className="post-ctrl-btn post-del-btn" 
                                                    onClick={() => showDelWarn(post.id)}>&#128465;</button>
                                                </li>
                                            </ul>
                                        </header>
                                        <p className="post-description">{post.description}</p>
                                    </article>
                                </li>
                        )
                    }
                </ul>
            </section>
        </Fragment>
    );
}

export default Admin;