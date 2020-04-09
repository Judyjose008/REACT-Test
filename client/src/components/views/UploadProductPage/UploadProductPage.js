import React, { useState } from 'react'
import { Typography, Button, Form, Input, Icon, Select} from 'antd'
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';
//import styles from antd to constants

const { Title } = Typography;
const {TextArea } = Input;




function UploadProductPage(props) {

    //Item category
    const ItemCategory = [
        {key: 1, value:"Electronics"},
        {key: 2, value:"Garments"},
        {key: 3, value:"Household"},
        {key: 4, value:"Apparels"},
        {key: 5, value:"Jewelery"}
    ]


    
    //label Input
    const [labelValue, setlabelValue] = useState("");
    const onlabelChange = (event) => {
        setlabelValue(event.currentTarget.value);
    }

    //Description Input
    const [DescriptionValue, setDescriptionValue] = useState("");
    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value);
    }

    //Price Input
    const [ PriceValue, setPriceValue ] = useState(0);
    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value);
    }

    //itemCategory Input

    const [itemCategoryValue, setitemCategoryValue] = useState(1);
    const onItemCategoryChange = (event) => {
        setitemCategoryValue(event.currentTarget.value);
    }

    const [images, setImages] = useState([])
    const updateImage = (newImage) =>{
        setImages(newImage)
    }



    // Product upload
    const onSubmit = (event) => {
        event.preventDefault();
        const variables = {
            writer : props.user.userData._id,
            title : labelValue,
            description : DescriptionValue,
            price : PriceValue,
            images  :  images,
            category : itemCategoryValue

        }
        if (!labelValue || !DescriptionValue || !PriceValue || !itemCategoryValue || !images) { 
            return alert('All the fields are required !');
        }

        Axios.post('/api/product/uploadProduct',variables)
            .then( response => {
                if(response.data.success) {
                    alert('Product uploaded!');
                    props.history.push('/');
                } else {
                    alert('failed to upload product');
                }
            })

    }
 
    // add more input options here .... ( just like above methode)
 
    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{ textAlign:'center', marginBottom:'2rem'}}>
                 <Title>Upload your product</Title>
            </div>
                 <Form onSubmit={onSubmit}>
                    <label>Upload photos( click to remove uploaded image )</label>
                    <FileUpload  refreshFunction={updateImage}/>
                    <br />
                    <br />
                    <label>Title</label>
                    <Input 
                        onChange={onlabelChange}
                        value={labelValue}
                        type="text"
                    ></Input>

                    <br />
                    <br />
                    <label>Description</label>
                    <TextArea
                        onChange={onDescriptionChange}
                        value={DescriptionValue}
                    ></TextArea>

                    <br />
                    <br />
                    <label>Price</label>
                    <Input 
                        onChange={onPriceChange}
                        value={PriceValue}
                        type="number"
                    ></Input>

                    <br />
                    <br />
                    <label>Select Category </label>
                    <select onChange={onItemCategoryChange}>
                        {ItemCategory.map( item => (
                            <option key={item.key} value={item.key}>{item.value}</option>
                        ))}
                    </select>
                    <br />
                    <br />
                    <Button 
                        onClick={onSubmit}
                    >
                        Add Product
                    </Button>
                 </Form>
        </div>
    )
}

export default UploadProductPage
