import React,{useContext} from 'react'
import styled from 'styled-components'
import { contextCreated } from "./ContextAPI";
import FlipMove from "react-flip-move";

function SideCart() {
    const [{ cart },] = useContext(contextCreated)
 
    
    return (
        <div>
         
            <Arrow>

            </Arrow>
       
        <Slidecartcontainer>
                
            <FlipMove >
                {cart.map(data => (
                    <div>
                        <img src={data.image} alt="" />
                        <span>₹{data.price}</span>
                    </div>
                ))
                    
                }
            </FlipMove>
          
           
        </Slidecartcontainer>
         
        </div>
    )
      
    
}
export default SideCart;
//styles
const Arrow = styled.div`
 

&:before{
    
        content: " ";
        position: relative;
        /* At the bottom of the tooltip */
        top:-30px;
        left:70px;
        margin-left: -5px;
        border-width: 10px;
        border-style: solid;
        border-color:transparent transparent white transparent;
        
}
`
const Slidecartcontainer = styled.div`
    background-color:white;
    img{
        height:90px;
        width: 50px;
        object-fit: contain;
    }
    span{
        color:#B65345;
        font-weight:600;
       
    }
    div{
        margin-top:0px;
        display: flex;
        flex-direction:column;
        align-items:center;
    }
`
