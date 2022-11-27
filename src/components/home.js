import {useEffect, useState} from "react";
import axios from "axios";

const Home =  () => {
    const size=20;
    const [products, setProducts] = useState([]);
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
    return (
        <div>
            <h1>Our Special</h1>
            <div>
                {products?.slice(0, size).map((product) => (
                    <div >
                        <h3>{product.strDrink}</h3>
                        <span> {product.strIngredient1}</span>
                        <span> {product.strIngredient2}</span>
                        <span> {product.strIngredient3}</span>
                        <br/>
                        <img src={product.strDrinkThumb} width={200} />

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;