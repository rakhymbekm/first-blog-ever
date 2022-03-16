import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import './Post.css';

const Post = () => {
    const { id } = useParams();
    const [blogPostExist, setBlogPostExist] = useState(false);
    const [blogPost, setBlogPost] = useState({});

    async function getBlogPost() {
        try {
            const res = await fetch("http://localhost:5000/post/" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res.status === 200) {
                const parsedRes = await res.json();
                if (parsedRes.length !== 0) {
                    setBlogPost(parsedRes[0]);
                    setBlogPostExist(true);
                }
            }            
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => getBlogPost(), []);
    
    if (blogPostExist) {
        return (
            <Fragment>
                <h1 className="main-content-heading">Жеке посттың беті</h1>		
                <article className="public-post">
                    <h1 className="public-post-title">{blogPost.title}</h1>
                    <div className="public-post-author-line">Пост авторы: <address className="public-post-author">{blogPost.nickname}</address></div>
                    <p className="public-post-body">{blogPost.body}</p>                
                </article>
            </Fragment>
        );       
    } else {
        return <NotFound />;
    }
};

export default Post;
