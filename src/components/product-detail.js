import React, {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../contexts/auth-context";
import {useParams} from "react-router";
import {Button, Card} from "react-bootstrap";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../firebase-config";
import {Link} from "react-router-dom";


const ProductDetail =  () => {
    const params = useParams();
    const [currentProduct, setCurrentProduct] = useState("");
    const {currentUser} = useAuth();
    const likesCollectionRef = collection(db, "likes");

    console.log(params.id)
    useEffect(() => {
        productDetail();
    }, []);

    const productDetail=() => {
        axios
            .get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`)
            .then((res) => {;
                setCurrentProduct(res.data.drinks[0]);
                console.log(currentProduct)

            })
            .catch((err) => {
                console.log(err);
            });
    }
    const createLike= async () => {
if (currentUser){
        await addDoc(likesCollectionRef, {email: currentUser.email, drinkId:currentProduct. idDrink, drinkName: currentProduct.strDrink, Ingredient1: currentProduct.strIngredient1,Ingredient2: currentProduct.strIngredient2,Ingredient3: currentProduct.strIngredient3});
    }}

    return (
        <div>
            <h1>Detail</h1>
            <div>

                <Card className="mt-2 text-center"  style={{ width: '18rem' }}>
                    <Card.Title className="mt-2 mb-0">{currentProduct.strDrink}</Card.Title>
                    <Card.Img src={currentProduct.strDrinkThumb} variant="top"/>
                    <span> {currentProduct.strIngredient1}</span>
                    <span> {currentProduct.strIngredient2}</span>
                    <span> {currentProduct.strIngredient3}</span>

                        <Button onClick={createLike} className="m-2" >
                            Favourite
                        </Button>

                </Card>

            </div>
        </div>
    );
};

export default ProductDetail;