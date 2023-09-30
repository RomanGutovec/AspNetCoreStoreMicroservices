import React, {useState} from 'react';
import {Button, Form, FormGroup, Label, Input, Container, Row, Col} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = (props) => {
    const [values, setValues] = useState({email: "", password: ""});
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onLogin(values.email, values.password);
        navigate('/');
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col sm="12" md="6">
                    <Form onSubmit={handleSubmit} className="mt-4 login-form">
                        <h2 className="mb-3">Login</h2>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                value={values.email}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                value={values.password}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <Button color="primary">Login</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;