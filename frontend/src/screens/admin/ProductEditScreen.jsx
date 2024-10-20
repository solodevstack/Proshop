import { useState,useEffect } from "react";
import { Link,useNavigate,useParams } from "react-router-dom";
import {Form,Button} from "react-bootstrap";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import {toast} from "react-toastify";
import { useUpdateProductMutation, useGetProductDetailsQuery,useUploadProductImageMutation} from "../../slices/productApiSlice";



const ProductEditScreen = () => {
    const {id: productId} = useParams();

    const [name,setName] = useState("");
    const [price,setPrice] = useState(0);
    const [image,setImage] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState("");

    const {data: product, isLoading, refetch, error} = useGetProductDetailsQuery(productId);
  const [updateProduct, {isLoading: loadingUpdate}] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setBrand(product.brand);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      }

  },[product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success('Product updated');
      refetch();
      navigate('/admin/productslist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) =>{
    const formData = new FormData();
    formData.append("image",e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      console.log(res)
      toast.success(res.message)
      setImage(res.image);
      
    } catch (err) {
      toast.error(err?.data?.message || err.error);

      
    }
  }




  return (
   <>
   <Link to="/admin/productslist" className="btn btn-light my-3">
   Go Back
   </Link>
   <FormContainer>
    <h1>Edit Product</h1>
    {loadingUpdate && <Loader />}
    {isLoading? <Loader /> : error? <Message variant="danger">{error}</Message> : (
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}>

          </Form.Control>
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
          type="number"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}>

          </Form.Control>
          </Form.Group>
          <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                label='Choose File'
                onChange={uploadFileHandler}
                type='file'
              ></Form.Control>
              {loadingUpload && <Loader />}
            </Form.Group>


        <Form.Group controlId="brand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
          type="text"
          placeholder="Enter Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}>


          </Form.Control>
        </Form.Group>
        <Form.Group controlId="countInStock">
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control
          type="number"
          placeholder="Enter countInStock"
          value={countInStock}
          onChange={(e) => setCountInStock(e.target.value)}>

          </Form.Control>
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
          type="text"
          placeholder="Enter Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}>
          </Form.Control>

        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}>

          </Form.Control>
        </Form.Group>
        <Button type="submit"
        variant="primary"
        className="my-2"
        > Update</Button>


      </Form>


    )}

   </FormContainer>
   
   </>
  )
}

export default ProductEditScreen