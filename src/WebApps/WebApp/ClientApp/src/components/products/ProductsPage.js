import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {getProducts} from "../api/productApi";

export function ProductsPage() {
    //const {products, getProducts} = props;
    const [products, setProducts] = useState("");
    //const [errors, setErrors] = useState({});
    //const [saving, setSaving] = useState(false);
    console.log(products);
    useEffect(() => {
        //console.log(props);
        debugger;
        var res = getProducts();
        setProducts(getProducts());


        // if (authors.length === 0) {
        //     loadAuthors().catch((error) => {
        //         alert("Loading authors failed" + error);
        //     });
        // }
    }, []);


    return (

        <div className="jumbotron">
            <h1>React-redux learning</h1>
            <p>React, Redux and React Router for ultra-responsive web apps.</p>
            <Link to="about" className="btn btn-primary btn-lg">
                Learn more
            </Link>
            <Card style={{width: '18rem'}}>
                {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
            <Container>
                <Row xs={3}>
                    <Col><Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body></Col>
                </Row>
                <Row xs={1} md={4} className="g-4">
                {products.map((product) => { return (
                    <Col>
                    <Card border="secondary">
                        <Card.Header>{product.name}</Card.Header>
                    <Card.Body>
                        {/*<Card.Title>{product.name}</Card.Title>*/}
                        <Card.Text>{product.summary}
                        </Card.Text>
                        <Card.Img variant="top" src = {`../images/${product.imageFile}`} >                  
                        </Card.Img>
                        <Button variant="primary">Go somewhere3</Button>
                    </Card.Body>
                    </Card>
                </Col>
                );
                })}
                </Row>
            </Container>
        </div>

    )
}