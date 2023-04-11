import {FormControl, FormLabel, Input } from "@chakra-ui/react"
import { useState } from "react"

export const EmailInput = ({...rest}) => {

    return (
        <FormControl>
            <FormLabel paddingBottom={1} fontWeight={"bold"}>Email</FormLabel>
            <Input type='email' {...rest} />
        </FormControl>
      
    )
  }
