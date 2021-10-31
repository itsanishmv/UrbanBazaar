import React from 'react'
import styled from 'styled-components'


function Order({order,date,time}) {
    return (
        <OrderContainer>
         
            <div style={{display:"flex",flexDirection:"column"}}>
                {order.items.map(x => (
                    <div>
                        <img src={x.image} alt="" />
                        <PriceWrap>
                            <h3>{x?.title}</h3>
                            <span>₹{x?.price}</span>
                        </PriceWrap>
                        
                    </div>

                    ))
                                
                } 
           </div>
            <DateandTime >
                 <p>
                  Date : {date}
                 </p>
                 <p>
                  Time : {time}
                </p>
           
            </DateandTime>
           
           
        </OrderContainer>
    )
}

export default Order
//styles 

const OrderContainer = styled.div`
    border-bottom:1px solid lightgray;
    margin-top:10px;
    margin-left:10px;
    padding:20px;
    display:flex;
    
    div{
        display: flex;
        img{
            height:150px;
            width:150px;
            object-fit: contain;
        }
        h3{
            font-size: 15px;
            width: 500px;
            margin-left:20px;
        }
     
    }
`
const PriceWrap = styled.div`
    display: flex;
    flex-direction: column;
    span{
        font-size: 20px;
        margin-left: 20px;
        color:#B65345;
    }
`
const DateandTime = styled.div`
            display:flex;
            flex-direction: column;
            transform:translate(500px,-30px);
            color:grey;
           font-weight: 600;
`