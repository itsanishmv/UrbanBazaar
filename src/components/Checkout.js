
import React, { useContext } from "react";
import styled from "styled-components";
import { contextCreated } from "./ContextAPI";
import CheckoutCart from './CheckoutCart'
import { useHistory } from 'react-router-dom'
import FlipMove from 'react-flip-move'

function Checkout() {
    const [{ cart, pin,user }, ] = useContext(contextCreated)
    const history = useHistory()
    const totalAmount = cart.reduce((amount, cartItem) => cartItem?.price + amount, 0)
    
   return (
       <CheckoutContainer>
           <LeftContainer>
               <CartTitle>
                    <h1>Shopping cart </h1>
                    <h4>{pin &&`Delivery - ${pin.district},${pin.statename}`}</h4>
                    <h5>price</h5>
               </CartTitle>
               <FlipMove leaveAnimation={"accordionHorizontal"}>
                    <div style={{marginTop:"30px"}}>
                            {cart.map((item) => (
                                    <CheckoutCart
                                        id={item.id}
                                        price={item.price}
                                        image={item.image}
                                        title={item.title}
                                        stars={item.stars}
                                        />
                            ))}
                    </div>
                </FlipMove>
               
           </LeftContainer>

           <RightContainer>
               <span>{!cart.length === 0 && "Your order is eligible for FREE Delivery."}</span>
               
               <h2>Subtotal({cart.length === 1 ? `${cart.length} item` : `${cart.length} items`}): <strong>₹{totalAmount.toLocaleString()}</strong></h2>
               
               <button onClick={() => !user ? history.push("/login") : history.push('/payments')}>{cart.length === 0 ? "No items in cart" : "Proceed to buy"}</button>
               <h5>{!user && "please sign in to continue" }</h5>
           </RightContainer>
       </CheckoutContainer>
  )
 }
export default Checkout;
const CheckoutContainer = styled.div`

    display:flex;
    margin-left: 20px;
   
`
const LeftContainer = styled.div`
     background-color:white;
     width: 1100px;
     padding:20px;
     margin-top:100px;
   
     h1{
        font-size: 35px;
        font-weight: 400;
        font-family:Arial, Helvetica, sans-serif;
     }
`

const RightContainer = styled.div`
    margin-top:100px;
    background-color: white;
    margin-left: 1160px;
    width: 300px;
    margin-right:0px;
    padding:15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height:200px;
    position: fixed;

    button{

        background-color: #F7CA00;
        border:none;
        
        padding:10px;
        width:300px;
        border-radius: 10px;
        
    }
    h2{
        width: 300px;
        font-family: Arial,sans-serif;
        font-weight:100;
        margin-bottom:50px;
    }
    h5{
        color:red;
    }
    span{
        font-size: 14px;
        transform: translate(-15px,5px);
        color:green;
    }
   
`
const CartTitle = styled.div`
    display:flex;
    justify-content:space-between;
    border-bottom:1px solid lightgray;
    h1{
        transform: translateY(-15px);
    }
    h5{
       
        font-weight:600;
        transform: translate(-10px,40px);
    }
    h4{
        height:20px;
        transform: translate(-520px,30px);   
        margin-right:30px;
        background-color:#E3E6E6;
        padding:5px 10px 5px 10px;
        border-radius: 7px;
        font-weight: 600;
        color:grey;
    }
`