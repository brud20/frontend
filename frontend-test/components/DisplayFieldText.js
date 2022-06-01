import { Text, Box, FormLabel } from '@chakra-ui/react'

/*
* Display field names as per a form label and values in a text format
* @param fieldName - label name
* @param fieldValue - value from field
*/
const DisplayFieldText = ({fieldName, fieldValue}) => {
  return (
    <Box pb='6'>
        <FormLabel pb='0.9'>{fieldName}</FormLabel>
        <Text color='dimgray' fontSize='md'>{fieldValue}</Text>
    </Box>
  )
}

export default DisplayFieldText