import {useEffect, useState} from "react";
import axios from "axios";
import {Card, Col, Row} from "react-bootstrap";

const Home =  () => {
    const size=20;
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentproduct] = useState("");
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios
            .get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=vodka')
            .then((res) => {
                console.log(res);
                setProducts(res.data.drinks);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const productDetail=(id) => {
            axios
                .get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
                .then((res) => {;
                    setCurrentproduct(res.data.drinks);
                    alert(currentProduct)
                })
                .catch((err) => {
                    console.log(err);
                });
    }

    return (
        <div>
        <Row>
            <h1>Our Special</h1>

                {products?.slice(0, size).map((product) => (

                    <Col xs={12} md={6} lg={4}  md={6}  >
                        <Card className="mt-2 text-center"  style={{ width: '18rem' }}>
                        <Card.Title className="mt-2 mb-0">{product.strDrink}</Card.Title>
                        <Card.Img src={product.strDrinkThumb} variant="top" />
                        </Card>
                    </Col>

                ))}
</Row>


        </div>

    );
};

export default Home;