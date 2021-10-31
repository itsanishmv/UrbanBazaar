import React, {useContext, useEffect,useState}from 'react'
import styled from 'styled-components'
import {getDocs, collection  } from '@firebase/firestore'
import { db } from '../firebase'
import { contextCreated } from './ContextAPI'
import Order from './Order'

import {Spinner} from './ProductDetails'
function Orders() {
    const [{ user }, ] = useContext(contextCreated)
    // get ordered items from db of that particular user
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        if (user) {
            async function getOrderedItems() {
                const data = await getDocs(collection(db, `Users/${user}`, "order"))
                if (data) {
                    setLoading(true)
                }
              
                setOrders(data.docs.map(x => (
                    x.data()
                    
                )))
                
            }
            getOrderedItems()

        }
        }, [user])

    return (
        <OrdersContainer>
            <Heading>
                <h2>Your Orders</h2>
                
            </Heading>

            {!loading &&
                <Spinner style={{transform:"translate(620px,150px)"}} >
                    <div> </div><div></div> <div></div><div></div>
               </Spinner>
             }
                {orders.map(ord => (
                        <Order order={ord} date={ord.date} time={ord.time}/>
                    ))
                        
                    }
            <h4>{orders === 0 ? "No orders yet" : ""}</h4>
            
           
       </OrdersContainer>
    )
}

export default Orders
//styled 

const OrdersContainer = styled.div`
    position: absolute;
    margin-top:120px;
    border:1px solid lightgray;
    background-color: white;
    width:90%;
    margin-left:70px;
    min-height:500px;
    h4{
        color:lightgray;
        margin-left: 600px;
    }
   
`
const Heading = styled.div`
    border-bottom:1px solid lightgrey;
    margin-left:20px;
    margin-right:20px;
    h2{
        transform:translate(20px,10px);
        font-family: Arial, Helvetica, sans-serif;
    }
`

