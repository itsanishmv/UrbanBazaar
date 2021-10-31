import React, {  useContext, useState } from "react";
import styled from "styled-components";
import { contextCreated } from "./ContextAPI";
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';

function PinCode() {

    const [pincodeNum, setPincodeNum] = useState('')
    const [, dispatch] = useContext(contextCreated)
    const [close, setClose] = useState(false)

    function pinCodefn(e) {
        e.preventDefault()
        setClose(true)
        fetch(`https://api.data.gov.in/resource/5c2f62fe-5afa-4119-a499-fec9d604d5bd?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&offset=0&limit=1&filters[pincode]=${pincodeNum}`)
            .then((res) => (
                 res.json()
            ))
            .then((data) => (
                dispatch({
                    type: "pin",
                    pin:data.records[0]
              })
                
            ))
            .catch((error) => {
            console.log("error",error.message)
            })
        setPincodeNum("")
    }
   return (
       <PincodeContainer>
           {close ? ""
               :
               <form onSubmit={pinCodefn} >
                   <input type="text" value={pincodeNum} placeholder="enter pincode" onChange={(e) => setPincodeNum(e.target.value)} />
                   <LocationSearchingIcon style={{ height: "15px", wodht: "15px", color: "black", transform: "translate(140px,-16px)" }} onClick={pinCodefn} />
               </form>
            }
        </PincodeContainer>
  )
}
 
export default PinCode;
//styles

const PincodeContainer = styled.div`
    height:0px;
    width:0;
    input{
        border:none;
        outline:none;
        box-shadow: rgba(233, 191, 7, 0.911) 0 0 2px 3px;
        
    }
  
`