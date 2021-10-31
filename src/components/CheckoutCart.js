import React, { useContext } from "react";
import styled from "styled-components";
import { contextCreated } from "./ContextAPI"; 
import StarIcon from '@material-ui/icons/Star';

function CheckoutCart({ id, image, title, stars, price }) {
    const [, dispatch] = useContext(contextCreated)
   
    const removeCartItems = () => {
        
        dispatch({
            type: "remove_from_cart",
            id: id,
        })
        
     }
   return (
       <CheckoutCartContainer>
           <img src={image} alt="img" />
           <ProductInfo>
               <Title>
                   {title}
               </Title>

               <div>
                   {/* print stars/rating */}
                    {Array(stars).fill().map(() => (
                            <StarIcon style={{color:"#FB9F1C"}}/>
                        ))
                            }
               </div>
              
               <button onClick={removeCartItems}>Remove item</button>
               
           </ProductInfo>
           
           <Price>
               <p>₹{ price}</p>
          </Price>
    </CheckoutCartContainer>
  )
}
 
export default CheckoutCart;

//styles

const CheckoutCartContainer = styled.div`
   display:flex;
   
    img{
        height:200px;
        width:200px;
        object-fit: contain;
    }
`
const ProductInfo = styled.div`
   width:700px;
   div{
       display:flex;
       margin-left:50px;
       margin-bottom: 10px;
   }
    button{
        background-color:yellow;
        margin-left:50px;
        margin-top:20px;
    }
 
`

const Title = styled.div`
    margin-top: 20px;
    font-weight:600;
    margin-left:50px;
`
const Price = styled.div`
    margin-left:160px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    color:
    
`