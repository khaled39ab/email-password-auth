import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import './LogIn.css'
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import app from '../../firebase.init';


const auth = getAuth(app);
const LogIn = () => {
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState('')

    const handleEmail = e => {
        setEmail(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value);
    }

    const handleLogIn = event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                const user = res.user;
                console.log(user);
            })
            .catch(err => {
                setError(err.message)
                console.log(err);
            })
    }

    const passwordResetEmail = e =>{
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        sendPasswordResetEmail(auth, email)
        .then(() =>{
            setSubmitted('Password reset email sent')
        })
        .catch(err =>{
            setError(err.message)
            console.log(err);
        })
    }
    return (
        <div className='logIn-container p-4 m-4 w-50 mx-auto'>
            <h2 className='text-center text-info'>Please Log In</h2>
            <Form noValidate validated={validated} onSubmit={handleLogIn}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onBlur={handlePassword} type="password" placeholder="Password" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid password.
                    </Form.Control.Feedback>
                </Form.Group>

                {
                    error ? <p className="text-danger">{error}</p> : <p className='text-success'>{submitted}</p>
                }

                <Button variant="primary" type="submit">
                    Log in
                </Button>
                <Button onClick={passwordResetEmail} variant="link">Forget Password?</Button>
                <hr />
            </Form>
            <div className='create-btn-sec'>
                <Link to={'/signUp'}>
                    <Button>
                        Create An Account
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default LogIn;