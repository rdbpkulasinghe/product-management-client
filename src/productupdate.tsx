import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductUpdate() {
    const { id } = useParams();
    const [productName, setProductname] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [category, setCategory] = useState("");
    const [sku, setSKU] = useState("");
    const [image, setimage] = useState<File | string>("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [imagePreview, setImagePreview] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axios
          .get(`http://localhost:3001/getProduct/${id}`)
          .then((result) => {
            setProductname(result.data.productName);
            setDescription(result.data.description);
            setPrice(result.data.price);
            setQuantity(result.data.quantity);
            setCategory(result.data.category);
            setSKU(result.data.sku);
            setimage(result.data.image);
            setImagePreview(`http://localhost:3001/${result.data.image}`);
          })
          .catch((err) => console.log(err));
      }, [id]);

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!productName) newErrors.Productname = "Product name is required";
        if (!description) newErrors.Description = "Description is required";
        if (price <= 0) newErrors.Price = "Price is required";
        if (quantity <= 0) newErrors.Quantity = "Quantity is required";
        if (!category) newErrors.Category = "Category is required";
        if (!sku) newErrors.SKU = "SKU is required";
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
                setImagePreview(URL.createObjectURL(file));
            } else {
                setError("Please upload a valid image file (jpg, png, gif).");
                event.target.value = ""; // Clear the input
            }
        } else {
            setError("No file selected.");
        }
    };

    const Update = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (validate()) {
            const formData = new FormData();
            formData.append("productName", productName);
            formData.append("description", description);
            formData.append("price", price.toString());
            formData.append("quantity", quantity.toString());
            formData.append("category", category);
            formData.append("sku", sku);

            if (image instanceof File) {
                formData.append("image", image);
            }

            axios
                .put(`http://localhost:3001/productupdate/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then(() => navigate("/"))
                .catch((error) => console.error("Error updating product:", error));
        }
    };

    return (
        <div className="d-flex vh-100 bg-dark-subtle justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Update}>
                    <h2>Update Product</h2>
                    <div className="mb-2">
                        <label htmlFor="productname">Product name</label>
                        <input
                            type="text"
                            placeholder="Enter Product Name"
                            className="form-control"
                            value={productName}
                            onChange={(e) => setProductname(e.target.value)}
                        />
                        {errors.Productname && <span className="text-danger">{errors.Productname}</span>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            placeholder="Enter Description"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {errors.Description && <span className="text-danger">{errors.Description}</span>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            placeholder="Enter Price"
                            className="form-control"
                            value={price}
                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                        />
                        {errors.Price && <span className="text-danger">{errors.Price}</span>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            placeholder="Enter Quantity"
                            className="form-control"
                            value={quantity}
                            onChange={(e) => setQuantity(parseFloat(e.target.value))}
                        />
                        {errors.Quantity && <span className="text-danger">{errors.Quantity}</span>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="category">Category</label>
                        <input
                            type="text"
                            placeholder="Enter Category"
                            className="form-control"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        {errors.Category && <span className="text-danger">{errors.Category}</span>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="sku">SKU</label>
                        <input
                            type="text"
                            placeholder="Enter SKU"
                            className="form-control"
                            value={sku}
                            onChange={(e) => setSKU(e.target.value)}
                        />
                        {errors.SKU && <span className="text-danger">{errors.SKU}</span>}
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
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Product"
                                style={{ width: "50px", height: "50px", marginTop: "10px" }}
                            />
                        )}
                    </div>
                    <button className="btn btn-success">Update</button>
                </form>
            </div>
        </div>
    );
}

export default ProductUpdate;
