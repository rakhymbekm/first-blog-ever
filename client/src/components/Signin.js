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
            const res = await fetch("http://localhost:5000/auth/signin", {
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
            <h1 className="main-content-heading">Жүйеге кіру беті</h1>
            <form className="log-in-form form" onSubmit={onSubmitForm}>
                <input
                    required
                    placeholder="Поштасы"
                    className="log-in-input log-in-name"
                    type="email"
                    name="email"
                    value={email}
                    onChange={ e => onChange(e) }
                />
                <br />
                <input
                    required
                    placeholder="Құпия сөзі"
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
                    value="Кіру" />
                <p className="sign-up-suggestion suggestion">Есептік жазбаңыз жоқ па? <Link to="/signup" className="suggestion-link">Тіркеліңіз</Link></p>
            </form>
        </Fragment>
    );
}

export default Signin;