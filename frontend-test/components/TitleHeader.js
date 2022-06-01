import { 
    Center, 
    Heading, 
} from '@chakra-ui/react'

/*
* Consistent header across the application
*/
const TitleHeader = () => {
  return (
    <Center padding='6' bg='lightgrey'>
        <Heading size='lg' color='dimgray'>Front End Technical Test</Heading>
    </Center>
  )
}

export default TitleHeader