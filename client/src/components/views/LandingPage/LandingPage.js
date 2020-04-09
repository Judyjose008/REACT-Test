import React , { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import Axios from 'axios';
import { Icon, Row, Col, Card } from 'antd';
import ImageSlider from '../../utils/ImageSlider';

const { Meta } =  Card;
 
function LandingPage() {

    const [Products, setProducts] = useState([]);

    useEffect(() => {
        Axios.post('api/product/getProducts')
            .then(response => {
                if(response.data.success) {
                        setProducts(response.data.products);
                        console.log(response.data.products);
                } else {
                    alert('failed to load the products');
                }
            })
        
    },[]);

    const renderCards = Products.map( (product, index) => {
        return  <Col lg={6} md={8} xs={24}>
                    <Card
                        hoverable={true}
                        cover= { <ImageSlider images= { product.images } />}
                    >
                    <Meta
                        title = {product.title}
                        description = {`Rs ${product.price}`}
                    />
                    </Card>
                </Col>
    });

    return (
        <div style={{width: '75%', margin: '3rem auto'}}>
            <div style={{ textAlign : 'center'}}>
                <h2>Shop With Us</h2>
            </div>
            {/*  Filter */}
            {/*  Search */}
            { Products.length === 0 ?
                    <div style={{ display: 'flex', height : '300px', justifyContent: 'center', alignItems:'center'}}>
                        <div>No products available</div>
                    </div> 
                    : 
                    <div>
                        <Row gutter={ [16,16]}>
                                {renderCards}
                        </Row>
                    </div>
            }
        </div>
    )
}

export default LandingPage  
