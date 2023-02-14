import { FormControl, FormLabel, Input } from "@chakra-ui/react";

function NormalInput({active, title, ...rest}) {
      return (
        <FormControl isRequired isDisabled={active ? true : false}>
            <FormLabel>{title} </FormLabel>
            <Input 
            {...rest}
            />
        </FormControl>
      );
  }
  export default NormalInput