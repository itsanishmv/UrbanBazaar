import React, { useContext} from "react";
import styled,{keyframes} from "styled-components";
import { contextCreated } from "./ContextAPI";
import { Link } from "react-router-dom";
import StarIcon from '@material-ui/icons/Star';

function Products({ id, title, image, stars, price }) {
    
    const [, dispatch] = useContext(contextCreated)
  

    const addtoCart = () => {
        dispatch({
            type: "add_to_cart",
            id: id,
            items: {
                id:id,
                title: title,
                image: image,
                stars: stars,
                price: price,
            }
        })
    }

 
    
   return (
       <ProductsContainer>
           <ProductTitle>
               
               <h5 >{title}</h5>
               <h4>₹{price}</h4>
               <div>
               {Array(stars).fill().map(() => (
                   <StarIcon style={{color:"#FB9F1C"}}/>
               ))
                }
               </div>
              
           </ProductTitle>
         
           <ProductImage>
                <Link style={{textDecoration:"none"}} to={`/product_details/${id}`}>
                        <img src={image} alt="" />
                </Link>
                <button onClick={addtoCart}>Add to cart</button>
            </ProductImage>
           
           
          
       </ProductsContainer>
  )
 }
export default Products;

//styles
const ProductsContainer = styled.div`
z-index:2;
    display:flex;
    align-items: center; 
    flex-direction: column;
    background-color:white;
    height:450px;
    width:400px;
    padding:20px;
    margin-left:25px;
    margin-top: 20px;
    &:hover{
        transition:0.25s box-shadow;
        box-shadow:
            0 2.8px 2.2px rgba(0, 0, 0, 0.034),
            0 6.7px 5.3px rgba(0, 0, 0, 0.048),
            0 12.5px 10px rgba(0, 0, 0, 0.06),
            0 22.3px 17.9px rgba(0, 0, 0, 0.072),
            0 41.8px 33.4px rgba(0, 0, 0, 0.086),
            0 100px 80px rgba(0, 0, 0, 0.12)
            ;
    }
`
const ProductTitle = styled.div`

    h5{
        height:40px;
        width: 410px;
    }
    h4{
    margin-top:30px;
    
    }
    div{
        display:flex;
        
    }
    p{

        margin-top:-20px;
    }
  
`
const Imageanimation = keyframes`
    0%   { transform: translateY(0); }
    50%  { transform: translateY(-20px); }
    
    100% { transform: translateY(0); }
`
const ProductImage = styled.div`
    display: flex;
    flex-direction:column;
    

    img{
        height: 200px;
        width:200px;
        margin-top: 20px;
        object-fit: contain;
        &:hover{
            animation-name: ${Imageanimation} ;
            animation-duration:1s;
        }
    }
    button{
        margin-top:20px;
        background-color:orange;
       
    }
`
