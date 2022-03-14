import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import './Signup.css';

const Signup = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        name: ''
    });

    const {email, password, name} = inputs;

    const onChange = e => setInputs({...inputs, [e.target.name]: e.target.value});

    const onSubmitForm = async e => {
        e.preventDefault();
        
        try {
            const body = {email, password, name};
            const res = await fetch("http://localhost:5000/auth/signup", {
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
            <h1 className="main-content-heading">Sign up page</h1>
            <form className="sign-up-form form" onSubmit={onSubmitForm}>
                <input
                    placeholder="Nickname..."
                    required
                    className="sign-up-input sign-up-name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={ e => onChange(e) }
                />
                <br />
                <input
                    placeholder="email..."
                    required
                    className="sign-up-input sign-up-email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={ e => onChange(e) }
                />
                <br />
                <input
                    placeholder="Password..."
                    required
                    className="sign-up-input sign-up-pass"
                    type="password"
                    name="password"
                    value={password}
                    onChange={ e => onChange(e) }
                />
                <br />
                <input
                    className="sign-up-input sign-up-btn"
                    type="submit"
                    value="Sign up"
                />
                <p className="sign-up-suggestion suggestion">
                    Already signed up? <Link to="/signin" className="suggestion-link">Sign in</Link>
                </p>
            </form>
        </Fragment>
    );
};

export default Signup;
