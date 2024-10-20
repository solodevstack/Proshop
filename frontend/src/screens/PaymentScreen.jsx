import { useState, useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Form,Button, Col } from "react-bootstrap"
import CheckoutSteps from "../components/CheckoutSteps"
import FormContainer from "../components/FormContainer"
import { savePaymentMethod } from "../slices/cartSlice"

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState("PayPal")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart;

    useEffect(()=>{
        if(!shippingAddress.address){
            navigate("/shipping");
            }

    },[shippingAddress,navigate]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        navigate("/placeorder");
        };


  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="paymentMethod">
                <Form.Label>Select Method</Form.Label>
                <Col>
                <Form.Check
                type="radio"
                label="PayPal or Credit Card"
                id="paypal"
                className="my-2"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                </Col>
                <Button type="submit" variant="primary">
                    Continue
                </Button>
      
           

            </Form.Group>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen