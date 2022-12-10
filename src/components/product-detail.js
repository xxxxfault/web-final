import {useEffect, useState} from "react";
import axios from "axios";

const ProductDetail =  (id) => {

    const [currentProduct, setCurrentproduct] = useState("");


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
            <h1>Detail</h1>
            <div>
                    <div >
                        <h3>{currentProduct.strDrink}</h3>
                        <span> {currentProduct.strIngredient1}</span>
                        <span> {currentProduct.strIngredient2}</span>
                        <span> {currentProduct.strIngredient3}</span>
                        <br/>
                        <img src={currentProduct.strDrinkThumb} width={200} />

                    </div>
            </div>
        </div>
    );
};

export default ProductDetail;