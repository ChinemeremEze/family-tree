import React, {useRef, useState} from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap';

import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

 const Signup = () =>{

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { addUserToMongo, signup } = useAuth()
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const  handleSubmit = async (e)=> {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Passwords don't match")
        }
        try{
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value)
            .then((result) => {
                addUserToMongo(result.user.email)
            })
           history.push("/dashboard")
        }
        catch{
            setError("Failed to create an account")
        }
        setLoading(false);
    }

    return (
        <>
             <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button className="w-100 mt-4" disabled={loading} type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className = "w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log in</Link>
            </div>
        </>
    )
}
export default Signup;