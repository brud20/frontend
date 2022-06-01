import { Flex, Box } from '@chakra-ui/react'
import Image from 'next/image'

const Footer = () => {
  return (
    <Flex className='footer-container' p='6' bg='lightgrey' flexDirection='column' alignItems='center'>
        <Box mb='2' color='dimgray'>
            Held by{' '}
        </Box>
        <div>
            <Image
            src='/firstaml.png'
            width='140' height='35'
            alt='First AML logo'
            />
        </div>
    </Flex>
  )
}

export default Footer