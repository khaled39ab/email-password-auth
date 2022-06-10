import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import app from '../../firebase.init';
import './SignUp.css'

const auth = getAuth(app);

const SignUp = () => {
    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState('')


    const handleFirstName = e => {
        setFirstName(e.target.value)
    }

    const handleLastName = e => {
        setLastName(e.target.value)
    }

    const handleUsername = () => {
        setUsername(firstName + lastName);
    }

    const handleEmail = e => {
        setEmail(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    const handleContactNumber = e => {
        setContactNumber(e.target.value)
    }

    const handleDateOfBirth = e => {
        setDateOfBirth(e.target.value)
    }

    const handleCity = e => {
        setCity(e.target.value)
    }

    const handleZip = e => {
        setZip(e.target.value)
    }

    const handleCountry = e => {
        setCountry(e.target.value)
    }

    const verifyEmail = () =>{
        sendEmailVerification(auth.currentUser)
        .then(() =>{
            setSubmitted('Email sent. Please verify your email')
            setEmail('')
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }
        if (!/(?=.{6,})(?=.*[!#$%&@? "])/.test(password)) {
            setError('Password should minimum 6 character with 1 special character.')
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then(res => {
            const user = res.user;
            console.log(user);
            setEmail('')
        })
        .catch(err =>{
            setError(err.message)
            console.log(err);
        })

        verifyEmail();
        // setSubmitted('Sign up complete successfully')
    };

    return (
        <div className='signUp-container w-50 p-4 m-4 mx-auto'>
            <h1 className='reg-title text-center mb-4'>Want to Registration!</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control onBlur={handleFirstName}
                            required
                            type="text"
                            placeholder="First name"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control onBlur={handleLastName}
                            required
                            type="text"
                            placeholder="Last name"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Form.Group as={Col} controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onBlur={handlePassword} type="password" placeholder="Password" required />
                    <Form.Text className="text-muted">
                        Password should minimum 8 character with 1 special character.
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid password.
                    </Form.Control.Feedback>
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} md="8" controlId="validationCustom03">
                        <Form.Label>Contact Number:</Form.Label>
                        <Form.Control onBlur={handleContactNumber}
                            required
                            type="text"
                            placeholder="Phone No"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control onBlur={handleDateOfBirth}
                            required
                            type="text"
                            placeholder="DD/MM/YYYY"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom05">
                        <Form.Label>City</Form.Label>
                        <Form.Control onBlur={handleCity} type="text" placeholder="City" required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid city.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom06">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control onBlur={handleZip} type="text" placeholder="Zip" required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid zip.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom07">
                        <Form.Label>Country</Form.Label>
                        <Form.Control onBlur={handleCountry} type="text" placeholder="Country" required />
                        <Form.Control.Feedback type="invalid">
                            Enter your Country name.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                    />
                </Form.Group>

                {
                    error ? <p className='text-danger'>{error}</p> : <p className='text-success'>{submitted}</p>
                }

                <div className='btn-container mt-4'>
                    <Button type="submit">Sign Up</Button>
                    <div className='logIn-sec'>
                        <p>Already have an account?</p>
                        <div>
                            <Link to={'/'}>
                                <button>Log In</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default SignUp;