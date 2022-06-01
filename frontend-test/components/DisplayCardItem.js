import { Flex, Center, useDisclosure} from '@chakra-ui/react'
import Image from 'next/image'
import FormModal from './FormModal'

/*
* Each card displays high level information, but holds the ability
* to be clicked - displaying more information in a modal and edit mode is available as well
* @param item - object with key value pair
* @param icon - static icon to display on the card
* @param title - specifying main label to display as a header in the card
*/
const DisplayCardItem = ({item, icon, title}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Flex 
            className='card-item__container cursor-pointer horse-item' 
            onClick={onOpen} 
            padding='4' 
            boxShadow='lg' 
            width={230}
            height={230}
            flexDirection='column'
            bg='white'>
                <Center pb='4' color='dimgray' flex='1'>
                    <b>{title}</b>
                </Center>
                <Center pb='4'>
                    <Image
                    src={icon}
                    height='95'
                    width='100'
                    alt='Horse icon'
                    />
                </Center>
            </Flex>
            <FormModal
            className='modal-container'
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            item={item}
            />
        </>

    )
}

export default DisplayCardItem