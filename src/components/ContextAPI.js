import React, {  useReducer, createContext } from 'react'

export const contextCreated = createContext()

export const StateContext = ({ Reducer, InitialState, children }) => {
    return (
    <contextCreated.Provider value={useReducer(Reducer, InitialState)}>
        {children}
    </contextCreated.Provider>
    )
}

 