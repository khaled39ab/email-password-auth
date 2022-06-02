import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import './LogIn.css'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

const LogIn = () => {
    const auth = getAuth();
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogIn = event => {
        
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        if(!/(?=.*[a-zA-Z >>!#$%&? "<<])[a-zA-Z0-9 >>!#$%&?<< ]/.test(password)){
            return
        }
        setValidated(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                const user = res.user;
                console.log(user);
            })
            .catch(err => console.error(err))
        // setEmail('')
        // setPassword('')
        event.preventDefault();
    }

    const handleEmailBlur = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordBlur = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div className='logIn-container p-4 m-4 w-50 mx-auto'>
            <h2 className='text-center text-info'>Please Log In</h2>
            <Form noValidate validated={validated} onSubmit={handleLogIn}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid password.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Log in
                </Button>
            </Form>
        </div>
    );
};

export default LogIn;