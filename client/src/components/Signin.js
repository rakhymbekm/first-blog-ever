import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import './Signin.css';

const Signin = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const {email, password} = inputs;

    const onChange = e => setInputs({...inputs, [e.target.name]: e.target.value});

    const onSubmitForm = async e => {
        e.preventDefault();
        
        try {
            const body = {email, password};
            const res = await fetch("/auth/signin", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            if (res.status === 200) {
                const parsedRes = await res.json();

                localStorage.setItem("token", parsedRes.token);

                setAuth(true);
            }
            

            
        } catch (err) {
            console.error(err.messaage);
        }
    };

    return (
        <Fragment>
            <h1 className="main-content-heading">Sign in page</h1>
            <form className="log-in-form form" onSubmit={onSubmitForm}>
                <input
                    required
                    placeholder="email"
                    className="log-in-input log-in-name"
                    type="email"
                    name="email"
                    value={email}
                    onChange={ e => onChange(e) }
                />
                <br />
                <input
                    required
                    placeholder="Password..."
                    className="log-in-input log-in-pass"
                    type="password"
                    name="password"
                    value={password}
                    onChange={ e => onChange(e) }
                />
                <br />
                <input
                    className="log-in-input log-in-btn"
                    type="submit"
                    value="Sign in" />
                <p className="sign-up-suggestion suggestion">Do not have an account? <Link to="/signup" className="suggestion-link">Register</Link></p>
            </form>
        </Fragment>
    );
}

export default Signin;
