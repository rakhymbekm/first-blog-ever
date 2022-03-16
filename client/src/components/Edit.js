import React, { Fragment, useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import './Edit.css';

const Edit = ({editPostId}) => {

    const history = useHistory();

    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        body: ''
    });

    const {title, description, body} = inputs;

    const onChange = e => setInputs({...inputs, [e.target.name]: e.target.value});

    async function getPost () {
        
        try {
            if (localStorage.getItem('token') !== null) {
                const res = await fetch("http://localhost:5000/admin/post/" + editPostId, {
                    method: "GET",
                    headers: {
                        token: localStorage.getItem('token'),
                        "Content-Type": "application/json"
                    }
                });

                if (res.status === 200) {
                    const parsedRes = await res.json();
                    setInputs({
                        title: parsedRes[0].title,
                        description: parsedRes[0].description,
                        body: parsedRes[0].body
                    });
                }
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(()=>getPost(), []);

    async function updatePost(e) {
        e.preventDefault();
        try {
            if (localStorage.getItem('token') !== null) {
                const res = await fetch("http://localhost:5000/admin/update/post/" + editPostId, {
                    method: "PATCH",
                    headers: {
                        token: localStorage.getItem('token'),
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(inputs)
                });

                if (res.status === 200) {
                    const parsedRes = await res.json();
                    console.log("updated post", parsedRes)
                }
            }
        } catch (err) {
            console.error(err.message);
        }
        
        history.push("/admin");
    }

    return (
        <Fragment>
            <h1 className="main-content-heading">Edit post</h1>
			<article className="edit-post">
				<form onSubmit={updatePost} className="edit-post-form">					
					<label 
                        className="post-edit-title-lable" 
                        htmlFor="post_edit_title">Title: </label>
                    <input 
                        type="text" 
                        name="title" 
                        onChange={e=>onChange(e)} 
                        id="post_edit_title" 
                        className="post-edit-title" 
                        required 
                        value={title}
                    />
                    <br/>
                    <label 
                        className="post-edit-description-lable" 
                        htmlFor="post_edit_description">Description: </label>
                    <input 
                        type="text" 
                        name="description" 
                        onChange={e=>onChange(e)} 
                        id="post_edit_description" 
                        className="post-edit-description" 
                        required 
                        value={description}
                    />
                    <br/>
					<label 
                        className="post-edit-body-lable" 
                        htmlFor="post_edit_body">Content: </label>
                    <br/>
					<textarea 
                        required 
                        id="post_edit_body" 
                        className="post-edit-body" 
                        name="body" 
                        rows="20" 
                        onChange={e=>onChange(e)} 
                        value={body}
                    ></textarea>
                    <br/>
					<input type="submit" className="btn btn-post-save" value="Сақтау"/>
				</form>
			</article>
        </Fragment>
    );
}

export default Edit;
