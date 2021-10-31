import React, { useContext,useState } from "react";
import styled from "styled-components";
import Search from "@material-ui/icons/Search"
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RoomIcon from '@material-ui/icons/Room';
import { Link } from "react-router-dom";
import { contextCreated } from "./ContextAPI";
import { auth} from '../firebase'
import { signOut } from '@firebase/auth'
import PinCode from "./Pincode";

const Header =()=> {
    const [{ cart, user,pin ,prod}, ] = useContext(contextCreated)
    const [click, setClick] = useState('')
    const [textInput , SetTextInput] = useState("")
    const [bool , setBool] = useState(false)
   

    function logOut() {
       
        signOut(auth)
            .then(() => {
                console.log("signed out")
            }).catch(err => {
                console.log(err.message)
            })
    }
    
   
    
    return (
           
        <HeaderContainer>
            <Link to="/">
               <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="logo" />
            </Link>
           
            <SelectAddress> 
                <div>
                    {pin ? "Deliver to" : "Hello"}
                    <RoomIcon style={{fontSize:"17px",marginLeft:"10px",transform:"translateY(5px)"}}/>
                </div>

                <h5 onClick={()=>setClick(!click)}>{pin ?  `${pin.district} ,${pin.statename}` :"Select your address"}</h5>
                <span>{click && <PinCode/>} </span> 
            </SelectAddress>
            
            <SearchContainer>
                <SearchBar onClick={()=>setBool(false)} onChange={(e) => { SetTextInput(e.target.value)}}/>
                { 
                    textInput && (
                        
                        !bool?
                        <ul >
                            {prod.filter(pro => pro.itm.title.toLowerCase().includes(textInput.toLowerCase())).map(result => (
                                <Link style={{textDecoration:"none"}} to={`/product_details/${result.id}`}>
                                    <li onClick={()=>setBool(true)} style={{ listStyle: "none" }}>{result.itm.title}</li>
                                </Link>
                            ))} 
                            </ul>
                            :""  
                   )
                }
                <SearchIconContainer>
                    <Search/>
                </SearchIconContainer>
                
            </SearchContainer>
            <SignInContainer>
                <Link to={!user&&"/login"}>
                    <div>{user? " Hello " + user: "Hello ,  sign in" }</div>
                    {user&&<button  onClick={logOut}>signOut</button>}
                   {!user && <h5>Accounts and Lists</h5>}
                    
                </Link>
               
            </SignInContainer>
           
                <Link style={{textDecoration:"none"}} to={user?'/orders' :""}>
                    <OrderContainer >
                        <div>Returns</div>
                        <h5 style={{color:"white"}}>and ORDERS</h5>
                   </OrderContainer>
                </Link>
            

            <Cart >
                <Link  to="/cart">
                    <AddShoppingCartIcon style={{fontSize:"35px"}}/>
                </Link>
               
                <div>{cart?.length}</div>
            </Cart>
           
            </HeaderContainer>
      

  )
}

export default Header;

//styles//
const HeaderContainer = styled.div`
 position:fixed;
    width:100%;
  background-color:#131921;
  height:70px;
  color:white;
  display: flex;
  justify-content:space-between;
  z-index:3;
  
  img{
      padding:20px 10px 10px 15px;
  }
  a{
      display:flex;
  }
`
const Cart = styled.div`
display: flex;
    margin-top: 7px;
    margin-left:6px;
    margin-right:30px;
    font-size:25px;
    border:1px solid black;
    padding: 10px 5px 5px 5px;
    div{
        color:orange;
    }
    a{
        color:white;
    }
    &:hover{
        border:1px solid white;
    }
`
const OrderContainer = styled.div`
    padding-top: 8px;
    margin-top:6px;
    border:1px solid black;
    padding-left:10px;
    padding-right:10px;
    
    div{
        color:#ccc;
    }
    h5{
        margin-top:0%;
        
    }
    &:hover{
        border:1px solid white;
    }
  
`
const SignInContainer = styled.div`
margin-top:8px;
margin-left: -20px;
margin-right:20px;  
border:1px solid black;
padding-top: 5px;
padding-bottom: 5px;
padding-left:5px;
padding-right:5px;
    div{
        color:#ccc ;
    }
    h5{
        margin-top:0;
    }
    a{
        display: flex;
        flex-direction: column;
        color:white;
        text-decoration: none;
    }
    button{
        background-color:#EFBC3B;
        font-family:Arial, Helvetica, sans-serif;
        font-size:13px;
        font-weight:200;
    }
    &:hover{
        border:1px solid white;
       
    }

`

const SelectAddress = styled.div`
    padding:5px 10px 5px 5px;
    border:1px solid black;
    margin-top: 10px;
    &:hover{
        border:1px solid white;
        cursor:pointer;
    }
    div{
        font-size: 15px;
        font-family: "Amazon Ember",Arial,sans-serif;
        color:#ccc;
    }
    h5{
        line-height: 20px;
        margin-top: 0;
    }
`
const SearchContainer = styled.div`
    display:flex;
    flex-grow: 1;
     border-radius: 5px;
     height:40px;
     margin-top:15px;
     ul{
         transform: translateY(35px);
         background-color: white;
         max-height:400px;
         max-width: 800px;
         position:absolute;
         padding:10px 10px 10px 10px;
         overflow-y: scroll;            
         box-shadow:
            0 2.8px 2.2px rgba(0, 0, 0, 0.034),
            0 6.7px 5.3px rgba(0, 0, 0, 0.048),
            0 12.5px 10px rgba(0, 0, 0, 0.06),
            0 22.3px 17.9px rgba(0, 0, 0, 0.072),
            0 41.8px 33.4px rgba(0, 0, 0, 0.086),
            0 100px 80px rgba(0, 0, 0, 0.12)
            ;
         li{
            padding:10px 10px 10px 10px;
             color:black;
             margin-top:10px;
             &:hover{
                 background-color: lightgray;
                 width: 100%;
             }
         }
     }
    
`
const SearchBar = styled.input`
    border-top-left-radius:5px  ;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-right-radius:5px;
    outline: none;
    flex-grow: 1;
    border-right:none;
    &:focus{
        box-shadow: 0 0 1pt 2pt darkorange;
     }

    
`
const SearchIconContainer = styled.div`
display: flex;
justify-content: center;
align-items:center;
color:black;
transform:translateX(-53px);
    background-color:orange;
    height:9px;
    width:25px;
    padding: 14px;
    margin-top: 2px;
    border-top-right-radius:5px  ;
    border-bottom-right-radius: 5px;
   

`
