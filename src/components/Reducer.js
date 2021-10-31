
export const IntitialState = {
    cart: [],
    user: null,
    pin: '',
    prod: [],
    prodSearch: "",
    buy: ""
}


const Reducer = (state, action) => {
    
    switch (action.type) {
        case "add_to_cart":
            return {
                ...state,
                cart: [...state.cart, action.items],
            }
        
        case "remove_from_cart":
            const index = state.cart.findIndex((cartitem) => cartitem.id === action.id)
            let newState = [...state.cart]

            if (index >= 0) {
                newState.splice(index,1)
            } else {
                console.log("nothing")
            }
            return {
                ...state,
                cart: newState,
            }
        
        case "User":
            
            return {
                ...state,
                user:action.user
            }
        case "pin":
            return {
                ...state,
                pin:action.pin
            }
       

        case "productArray":
            return {
                ...state,
                prod:action.data
            }
        case "buy":
            return {
                ...state,
                buy:action.item
            }
        case "empty_cart":
            return {
                ...state,
                cart:[]
            }
        
        
            default :
            return state;
        
    }
 
    
    }
      
export default Reducer;
    
