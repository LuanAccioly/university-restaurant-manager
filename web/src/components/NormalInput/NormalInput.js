import { FormControl, FormLabel, Input } from "@chakra-ui/react";

function NormalInput(props) {
    const title = props.title;
    const active = props.active;
      return (
        <FormControl isRequired isDisabled={active ? true : false}>
            <FormLabel>{title} </FormLabel>
            <Input 
            placeholder=''/>
        </FormControl>
      );
  }
  
  export default NormalInput