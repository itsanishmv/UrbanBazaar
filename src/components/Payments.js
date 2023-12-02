import React, { useContext } from "react";
import styled from "styled-components";
import { contextCreated } from "./ContextAPI";
import { useHistory } from "react-router-dom";
import { db } from '../firebase'
import { addDoc,collection, doc} from '@firebase/firestore'

function Payments(){
    const [{ cart, user, buy ,prod}, dispatch] = useContext(contextCreated)
    console.log(buy)
    const history = useHistory()
    // const cart2 = [...cart.reduce((map,obj)=> map.set(obj.id,obj),new Map()).values()]
    const totalAmount = cart?.reduce((amount, cartItem) => cartItem?.price + amount, 0)
    const oneItemtoBuy = prod?.filter(itemId => itemId.id === buy)
    const d = new Date()
    async function  addOrders() {
        const collec = doc(db, `Users/${user}`, ) 
        await addDoc(collection(collec, "order"), {
            items: cart,
            date: `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`,
            time: `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
            })
       
            dispatch({
                type:"empty_cart"
            })
                
            history.push("/orders")
      
    }
    
    function errorMessage() {
        console.log("sign in to continue")
    }
    
    
    return (
        <PaymentContainer>
            <LeftSideBox>
              
            <h2>Review your order</h2>

                    <TopComponent>
                        {/* shipping details */}
                        <h3>Shipping details :</h3>
                        <h5>krishna kripa kooloth kulam road , Aduthila , payanagadi , kannur , kerala 670303</h5>
                         <div>
                            <h3>Total items :</h3>
                            <h5>{cart?.length}</h5>
                         </div>
                    </TopComponent>

                    <ItemList>
                        {/* item list */}
                    {buy ?
                        <div>
                            <img src={oneItemtoBuy[0]?.itm.image} alt="img" />
                            <h4>{oneItemtoBuy[0]?.itm.title}</h4>
                            <h3>{oneItemtoBuy[0]?.itm.price}</h3>
                        </div>
                        :
                        cart.map(item=> {
                           return <div>
                                <img src={item.image} alt="img" />
                                <h4>{item.title}</h4>
                                <h3>{item.price}</h3>
                             </div>
                        })
                      
                    }
                    
                        
                        
                </ItemList>
                       <div style={{marginBottom:"100px ",marginLeft:"700px",fontSize:"15px"}}>
                           <h1 style={{fontWeight:"600",borderBottom:"1px solid lightgrey"}}>Subtotal : <span style={{fontFamily:"helvetica",color:"#B65345"}}>₹{totalAmount?.toLocaleString()}</span> </h1>
                        </div>
            </LeftSideBox>
     
            
            <PlaceOrder>
                {/* enter card and buy */}
                <h3>Place order</h3>
                <input placeholder="enter card number" type="text" />
                <input placeholder="cvv" type="password" />
                <button onClick={user && cart?.length > 0 ? addOrders : errorMessage}>Pay</button>
                        
               
                <Form >
                    <input type="radio" value="Debit card" />
                    <label For="Debit card">Debit card</label> 
                    <input type="radio" value="Credit card" />
                    <label htmlFor="Credit card">credit card</label>
                </Form>
                <div style={{display:"flex"}}>
                    <input style={{height:"20px",width:"20px"}} type="checkbox" />
                    <span style={{transform:"translateY(10px)"}}>POD</span>
                </div>
               
            </PlaceOrder>
       </PaymentContainer>
       
    )
}
 
export default Payments;

//styles

const LeftSideBox = styled.div`
    display: flex;
    flex-direction:column;
    margin-left:40px;
    margin-top:20px;
    h2{
        font-family: Arial, Helvetica, sans-serif;
       
    }
`
const PaymentContainer = styled.div`
    position:absolute;
    margin-top:50px;
    display:flex;
    background-color: white;
    height:100vh;
    width:1510px;
  
`
const TopComponent = styled.div`
  border:1px solid lightgray;
  height:100px;
  display:flex;
  h3{
      margin-left: 200px;
      margin-top: 30px;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 400;
  }
  h5{
      width:150px;
      font-family:Arial, Helvetica, sans-serif ;
      margin-left: 20px;
  }
  div{
      h5{
          transform:translate(300px,-55px);
          font-size: 20px;
      }
  }
 
`
const ItemList = styled.div`
     border:1px solid lightgray;
     border-bottom: none;
     overflow-y: scroll;
     margin-top:20px;
     height:350px;
     width:1100px;
     padding:20px;
     
 
    &::-webkit-scrollbar{
       width: 10px;
    }
    &::-webkit-scrollbar-thumb{
        background: darkgrey;
        border-radius: 5px;
    }
    &::-webkit-scrollbar-track{
        background: lightgrey;
    }
    div{
      display: flex;
        img{
            height:100px;
            width:100px;
            object-fit: contain;
        }
        h4{
            width: 500px;
            
        }
        h3{
            margin-left:200px;
        }
    }
`

const PlaceOrder = styled.div`
    border:1px solid lightgray;
    margin-left:20px;
    margin-top: 85px;
    width: 300px;
    height:500px;
    display: flex;
    flex-direction: column;
    input{
        border-top: none;
        border-bottom:1px solid lightgray;
        border-radius : 5px;
        outline:none;
        border-right: none;
        border-left:none;
        margin-left:20%;
        width: 200px;
        margin-top: 10px;
        height:50px;
    }
    h3{
        margin-left:20%;
        width: 100px;
        font-weight: 400;
    }
    button{
        width: 200px;
        margin-left:20%;
        margin-top:10px;
    }
`
const Form = styled.form`
    display:flex;
    margin-top:20px;
    margin-left:-10px;
    input{
        color:red;
        height:10px;
        width: 10px;
        border:black;
    }
   
`