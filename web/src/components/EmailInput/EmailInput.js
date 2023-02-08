import {FormLabel, Input } from "@chakra-ui/react"
import { useState } from "react"

export const EmailInput = () => {
    const [input, setInput] = useState('')
  
    const handleInputChange = (e) => setInput(e.target.value)
  
  
    return (
        <>
        <FormLabel>Email</FormLabel>
        <Input type='email' value={input} onChange={handleInputChange} />
        </>
      
    )
  }