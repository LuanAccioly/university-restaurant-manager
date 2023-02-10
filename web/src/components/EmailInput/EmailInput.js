import {FormControl, FormLabel, Input } from "@chakra-ui/react"
import { useState } from "react"

export const EmailInput = () => {
    const [input, setInput] = useState('')
    const handleInputChange = (e) => setInput(e.target.value)
    return (
        <FormControl>
            <FormLabel paddingBottom={1}>Email</FormLabel>
            <Input type='email' value={input} onChange={handleInputChange} />
        </FormControl>
      
    )
  }
