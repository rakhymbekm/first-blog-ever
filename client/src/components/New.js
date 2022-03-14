import React, { Fragment, useState } from 'react';
import {useHistory} from 'react-router-dom';
import './New.css';

const New = () => {

    const history = useHistory();

    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        body: ''
    });

    const {title, description, body} = inputs;

    const onChange = e => setInputs({...inputs, [e.target.name]: e.target.value});

    async function savePost(e) {
        e.preventDefault();
        try {
            if (localStorage.getItem('token') !== null) {
                const res = await fetch("http://localhost:5000/admin", {
                    method: "POST",
                    headers: {
                        token: localStorage.getItem('token'),
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(inputs)
                });

                if (res.status === 200) {
                    const parsedRes = await res.json();
                    console.log("created post", parsedRes)
                }
            }
        } catch (err) {
            console.error(err.message);
        }
        
        history.push("/admin");
    }

    return (
        <Fragment>
            <h1 className="main-content-heading">New post creation page</h1>
			<article className="post">
				<form onSubmit={savePost} className="post-form">
					<input 
                        onChange={e=>onChange(e)} 
                        value={title} 
                        name="title" 
                        placeholder="Title..." 
                        type="text"
                        id="post_title" 
                        className="post-title" 
                        required 
                    />
                    <br />
                    <input 
                        onChange={onChange} 
                        value={description} 
                        name="description" 
                        placeholder="Description..." 
                        type="text"
                        id="post_description" 
                        className="post-description" 
                        required 
                    />
                    <br />
					<textarea 
                        onChange={onChange} 
                        value={body} 
                        name="body" 
                        cols="120" 
                        rows="20" 
                        placeholder="Content of the new post" 
                        className="post-body"></textarea>
                    <br />
					<input type="submit" className="btn btn-post-create" value="Publish" />
				</form>
			</article>
        </Fragment>
    );
}

export default New;
