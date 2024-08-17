import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function productCreate(){
    const [productName, setProductname] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [category, setCategory] = useState("");
    const [sku, setSKU] = useState("");
    const [image, setimage] = useState<File | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [error, setError] = useState("");

    const navigate = useNavigate()

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!productName) newErrors.productName = "Product name is required";
        if (!description) newErrors.description = "Description is required";
        if (price <= 0) newErrors.price = "Price is required ";
        if (quantity < 0 ) newErrors.quantity = "Quantity is required";
        if (!category) newErrors.category = "Category is required";
        if (!sku) newErrors.sku = "SKU is required";
        if (!image) newErrors.image = "Image upload is required";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileTypes = ["image/jpeg", "image/png", "image/gif"];
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (fileTypes.includes(file.type)) {
                setimage(file);
            } else {
                setError("Please upload a valid image file (jpg, png, gif).");
                event.target.value = ""; 
            }
        } else {
            setError("No file selected.");
        }
    };
    

      const Submit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (validate()) {
          const formData = new FormData();
          formData.append("productName", productName);
          formData.append("description", description);
          formData.append("price", price.toString());
          formData.append("quantity", quantity.toString());
          formData.append("category", category);
          formData.append("sku", sku);
          if (image) formData.append("image", image);
          axios
            .post("http://localhost:3001/productcreate", formData)
            .then((result) => {
              navigate("/");
            })
            .catch((error) => console.error("Error cretaing product:", error));
        }
      };
    return (
        <div>
            <div className=" d-flex vh-100 bg-dark-subtle justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
            <form onSubmit={Submit}>
                <h2>Add Product</h2>
                <div className="mb-2">
                    <label htmlFor="">Product name </label>
                    <input type="text" placeholder='Enter Product Name' className='form-control' onChange={(e)=> setProductname(e.target.value)}/>
                    {errors.productName && <span className="text-danger">{errors.productName}</span>}
                </div>
                <div className="mb-2">
                    <label htmlFor="">Description </label>
                    <input type="text" placeholder='Enter Description' className='form-control' onChange={(e)=> setDescription(e.target.value)}/>
                    {errors.description && <span className="text-danger">{errors.description}</span>}

                </div>
                <div className="mb-2">
                    <label htmlFor="">Price </label>
                    <input type="number" placeholder='Enter Price' className='form-control' onChange={(e)=> setPrice(parseFloat(e.target.value))}/>
                    {errors.price && <span className="text-danger">{errors.price}</span>}

                </div>
                <div className="mb-2">
                    <label htmlFor="">Quantity </label>
                    <input type="number" placeholder='Enter Quantity' className='form-control' onChange={(e)=> setQuantity(parseFloat(e.target.value))}/>
                    {errors.quantity && <span className="text-danger">{errors.quantity}</span>}

                </div>
                <div className="mb-2">
                    <label htmlFor="">Category </label>
                    <input type="text" placeholder='Enter Category' className='form-control' onChange={(e)=> setCategory(e.target.value)}/>
                    {errors.category && <span className="text-danger">{errors.category}</span>}

                </div>
                <div className="mb-2">
                    <label htmlFor="">SKU </label>
                    <input type="text" placeholder='Enter SKU' className='form-control' onChange={(e)=> setSKU(e.target.value)}/>
                    {errors.sku && <span className="text-danger">{errors.sku}</span>}

                </div>
                <div className="mb-2">
              <label htmlFor="image">Image Upload</label>
              <input
                type="file"
                id="image"
                className="form-control"
                onChange={handleImageUpload}
              />
              <span className="text-danger">{error}</span>
            </div>
                <button className='btn btn-success'>ADD</button>
            </form>
        </div>  
        </div>
       
        </div>
    )

}
export default productCreate;