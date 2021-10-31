import React,{useContext, useEffect, useState} from 'react'
import styled,{keyframes} from 'styled-components'
import { contextCreated } from "./ContextAPI";
import StarIcon from '@material-ui/icons/Star';
import { getDoc, doc } from '@firebase/firestore'
import { db } from '../firebase'
import {useParams,useHistory} from 'react-router-dom'

function ProductDetails() {
    const [{ prod}, dispatch] = useContext(contextCreated)
    const [detailsData, setDetailsData] = useState()
    const [LoadingSpinner, setLoadingSpinner] = useState(false)
    const params = useParams()
    const history = useHistory()
    
    const date = new Date()
    const monthnames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sept", 'oct', "nov", "dec"]
    const Days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"] 
    const Day = Days[date.getDay()+3]
    const month = monthnames[date.getMonth()]
    const Dates = date.getDate()

    useEffect(() => {
        //  scroll to top when the component is loaded
        window.scrollTo(0, 0)
        // get product data 
        async function getProductDetails() {
            const retreiveDoc = doc(db, `products/${params.id}`)
            const getData = await getDoc(retreiveDoc)
            if (getData.exists()) {
                setDetailsData(getData.data())
                setLoadingSpinner(true)
            } else {
                setLoadingSpinner(false)
            }
        }
        getProductDetails()
       
    }, [params.id])

    const Buy = () => {
       
        dispatch({
            type: "buy",
            item: params.id
        })
        history.push("/payments")
    }
    const addtoCart = () => {
        const clickedItemDetails = prod.filter(x => x.id === params.id)
      
            dispatch({
                type: "add_to_cart",
                id: params.id,
                items: {
                    image: clickedItemDetails[0].itm.image,
                    title: clickedItemDetails[0].itm.title,
                    stars: clickedItemDetails[0].itm.rating,
                    price: clickedItemDetails[0].itm.price
                }
            })
    }
   
    
    return (

        <ProductDetailsContainer>
            <Image>
               
                {!LoadingSpinner &&
                    <Spinner>
                        <div> </div><div></div> <div></div><div></div>
                    </Spinner>
                   
                }
                <img src={detailsData?.image } alt="" />
                
            </Image>

            <Details>
                <Title>
                    <h1>{detailsData?.title}</h1>
                </Title>

                <Rating>
                    {Array(detailsData?.rating).fill().map(() => (
                        < StarIcon style={{color:"#FB9F1C"}}/>
                    ))
                     }
                </Rating>

                <PriceBox>
                    <div>
                        <span>M.R.P :</span>  <span style={{textDecoration:"line-through"}}> ₹{detailsData?.price*2}</span>
                    </div>
                    <div>
                        <strong>Deal of the day :</strong> <span style={{ color: "#B65345", fontWeight: "600", fontSize: "20px" }}> ₹{ detailsData?.price}</span>
                    </div>
                    <h3 style={{ color: "green" }}>In stock</h3>
                    
                </PriceBox>

                <Deliveryinfo>
                    <h4 style={{ color: "#007185", fontWeight: "400" }}>FREE delivery available <strong style={{ color: "black" }}>{`${Day} ,${month} ${Dates+3}`}</strong> </h4>
                </Deliveryinfo>
                <Warranty>
                    <div>
                        <img src="https://images-na.ssl-images-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB484059092_.png" alt="" />
                        <h5>10 days replacement</h5>
                    </div>
                    <div>
                        <img src="https://images-na.ssl-images-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-amazon-delivered._CB485933725_.png" alt="" />
                        <h5>Amazon delivered</h5>
                    </div>
                    <div>
                        <img src="https://images-na.ssl-images-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-warranty._CB485935626_.png" alt="" />
                        <h5>1 year warranty</h5>
                    </div>
                    <div>
                        <img src="https://images-na.ssl-images-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/No_contact_delivery_final._CB432269791_.png" alt="" />
                        <h5>No-contact delivery</h5>
                    </div>
                </Warranty>
               
                <div>
                    <h3>About the item</h3>
                    <ul>
                        {detailsData?.about}
                    </ul>
                </div>
            </Details>
            <BuyandCart>
                
                <h5>Buy or add to cart</h5>
               
                <Add2Cartbtn onClick={addtoCart}>Add to cart</Add2Cartbtn>
                <Buybtn onClick={Buy}>buy</Buybtn>
                <p>Item arrives in packaging that reveals what’s inside and can’t be hidden. If this is a gift, consider shipping to a different address.</p>
            </BuyandCart>
        </ProductDetailsContainer>
    )
}
export default ProductDetails;

//styles
const ProductDetailsContainer = styled.div`
    background-color:white;
    display:flex;
    justify-content: center;
    align-items: center;
`
const Image = styled.div`
    height:500px;
    width: 500px;
    margin-top:0;
    margin-left:50px;
    transform:translate(-170px,-280px);
    position:sticky;
    display:flex;
    justify-content: center;
    align-items:center;
    img{
        height:400px;
       max-width: 500px;
        object-fit: contain;   
    }
`
const Details = styled.div`
    display:flex;
    transform:translate(-100px,-200px);
    flex-direction:column;
    margin-top:300px;
    height:1000px;
    div{
        width:600px;
    }
`
const Title = styled.div`
    border-bottom:1px solid lightgrey;
    h1{
        max-width:600px;
        font-weight: 400;
        font-size: 25px;
    }
`
const Rating = styled.div`
    
`
const PriceBox = styled.div`
    display:flex;
    flex-direction:column;
`
const BuyandCart = styled.div`
     border:2px solid lightgrey;
     display:flex;
     flex-direction: column;
     height:500px;
     width: 200px;
     transform:translate(600px,-270px);
     position:fixed;
     padding:10px;
     h5{
         color:#007185;
     }
`
const Buybtn = styled.button`
    background-color: #FA8900;
    border-radius:10px;
    border:none;
    margin-bottom:10px;
    padding:5px;

`
const Add2Cartbtn = styled(Buybtn)`
    background-color: #F7CA00;
`
const Deliveryinfo = styled.div`
    transform:translateY(-43px);
    border-bottom:1px solid lightgrey;
`
const Warranty = styled.div`
    display:flex;
    justify-content: space-between;
    h5{
        color:#007185;
    }
    img{
        margin-top:-30px;
        margin-left:15px;
    }
    
`
const spinneranimation = keyframes`
 0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
  `
 const Spinner = styled.div`
      display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
        div{
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: 64px;
            height: 64px;
            margin: 8px;
            border: 8px solid #fff;
            border-radius: 50%;
            animation: ${spinneranimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: #FA8900 transparent transparent transparent;
        }
        div:nth-child(1) {
            animation-delay: -0.45s;
        }
        div:nth-child(2) {
            animation-delay: -0.3s;
        }
        div:nth-child(3) {
            animation-delay: -0.15s;
        }
        
`

export {spinneranimation , Spinner}