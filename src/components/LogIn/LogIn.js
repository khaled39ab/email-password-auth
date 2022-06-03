import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import './LogIn.css'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';
import app from '../../firebase.init';


const auth = getAuth(app);
const LogIn = () => {
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')


    const handleEmailBlur = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordBlur = (event) => {
        setPassword(event.target.value);
    }

    const handleLogIn = event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            return;
        }
        if (!/(?=.{8,})(?=.*[!#$%&@? "])/.test(password)) {
            setError('Password should minimum 8 character with 1 special character.')
            return;
        }
        setValidated(true);
        setError('');

        createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                const user = res.user;
                setEmail('')
                setPassword('')
                console.log(user);
            })
            .catch(err => {
                setError(err)
                console.error(err.message)
            })
        event.preventDefault();
    }

    return (
        <div className='logIn-container p-4 m-4 w-50 mx-auto'>
            <h2 className='text-center text-info'>Please Log In</h2>
            <Form noValidate validated={validated} onSubmit={handleLogIn}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
                    <Form.Text className="text-muted">
                        Password should minimum 8 character with 1 special character.
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid password.
                    </Form.Control.Feedback>
                </Form.Group>
                <p className="text-danger">{error}</p>
                <Button variant="primary" type="submit">
                    Log in
                </Button>
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