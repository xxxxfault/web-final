import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Input}  from 'semantic-ui-react'
import {Card, Col, Row} from "react-bootstrap";
import {Route, Routes} from "react-router-dom";
import ProductDetail from "./product-detail";
export default function Search() {
    const [APIData, setAPIData] = useState([])
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    useEffect(() => {
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=vodka`)
            .then((response) => {
                setAPIData(response.data.drinks);
                console.log(response);
            })
    }, [])

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = APIData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(APIData)
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <input size="100%"
                   placeholder='Search...'
                   onChange={(e) => searchItems(e.target.value)}
            />
            <Row>
                {searchInput.length > 1 ? (
                    filteredResults?.map((product) => {
                        return (
                            <Col xs={12} md={6} lg={4}  >
                                <Card className="mt-2 text-center"  style={{ width: '18rem' }}>
                                    <Card.Title className="mt-2 mb-0">{product.strDrink}</Card.Title>
                                    <Card.Img src={product.strDrinkThumb} variant="top" />
                                    <Routes>
                                        <Route path="/detail"
                                               element={<ProductDetail id={product.idDrink}/>}/>
                                    </Routes>

                                </Card>
                            </Col>
                        )
                    })
                ) :   (
                    APIData?.map((product) => {
                        return (
                            <Col xs={12} md={6} lg={4} >
                                <Card className="mt-2 text-center"  style={{ width: '18rem' }}>
                                    <Card.Title className="mt-2 mb-0">{product.strDrink}</Card.Title>
                                    <Card.Img src={product.strDrinkThumb} variant="top" />
                                </Card>
                            </Col>
                        )
                    })
                )}
                </Row>
        </div>
    )
}