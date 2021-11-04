import React, { Fragment, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [isAllPostShown, setIsAllPostShown] = useState(false);
    const [postNumberLimit, setPostNumberLimit] = useState(10); // 10 is default limit
    const [posts, setPosts] = useState([]);

    async function getPosts() {
        try {
            const res = await fetch("http://localhost:5000/posts/" + postNumberLimit, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res.status === 200) {
                const parsedRes = await res.json();
                setPosts(parsedRes);
                if (parsedRes.length < postNumberLimit) {
                    setIsAllPostShown(true);
                }
            }
            
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => getPosts(postNumberLimit),[postNumberLimit]);

    return (
        <Fragment>
            <h1 className="main-content-heading">Басты бет</h1>
			<section className="public-home-posts">
				<h1 className="public-home-posts-heading">Посттар</h1>
                <ul className="public-home-post-list">
					{
                        posts.map(
                            (post, i) => 
                                <li key={i} className="public-home-post-list-item">
                                    <article className="public-home-post">
                                        <h1 className="public-home-post-title"><Link to={"/post/" + post.id} className="public-home-post-link">{post.title}</Link></h1>
                                        <p className="public-home-post-description">{post.description}</p>
                                        <div className="public-home-post-author-line">Пост авторы: <address className="public-home-post-author">{post.nickname}</address></div>
                                    </article>
                                </li>
                        )
                    }
                </ul>
                {
                    isAllPostShown ?
                        <p className="public-home-no-post-info">Посттардың бары осы...</p> :
                        <Fragment>
                            <p className="public-home-show-more-line">
                                <button 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPostNumberLimit(postNumberLimit+10);
                                    }}
                                    className="public-home-show-more-btn">Тағы басқа посттарды көрсету</button>
                            </p>
                        </Fragment>
                }
            </section>
        </Fragment>
    );
};

export default Home;