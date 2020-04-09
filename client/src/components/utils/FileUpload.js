 import React, { useState } from 'react'
 import Dropzone from 'react-dropzone'
import { Icon } from 'antd';
import Axios from 'axios';
 function FileUpload(props) {
    const [images, setImage] = useState([]);

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header : {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0]);
        Axios.post('/api/product/UploadImage',formData, config)
        .then(response => {
            if(response.data.success) {
                setImage([...images , response.data.image]);
                props.refreshFunction([...images ,response.data.image])
            }else{
                alert('failed to add porduct image')
            }
        })
    }

    const onDelete = (image) => {
        const currentIndex = images.indexOf(image);
        let newImages = [...images];
        newImages.splice(currentIndex, 1)
        setImage(newImages);
        props.refreshFunction(newImages);
    }

     return (
         <div style={{ display:'flex', justifyContent:'space-between'}}>
             <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={80000000}
             >
                 {({getRootProps, getInputProps}) => (
                    <div style={{
                            width:'300px', height:'240px', 
                            border:'1px solid lightgrey', display:'flex',
                            alignItems:'center',justifyContent:'center'
                        }} {...getRootProps()}
                    >
                        <input {...getInputProps()}/>
                        <Icon type="plus" style= {{
                            fontSize:'3rem'
                        }} />
                    </div> 
                 )}

             </Dropzone>
             <div style={{ display:'flex', width:'350px', height:'240px', overflowX:'scroll'}}>
                    {images.map((image, index) => (
                        <div onClick={ () => onDelete(image)}>
                            <img 
                                style={{
                                    minWidth:'300px',
                                    width:'300px',
                                    height:'240px'
                                }}
                                src= {`http://localhost:5000/${image}`}
                            />
                        </div>
                    ))}
             </div>

         </div>
     )
 }
 
 export default FileUpload
 