import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    Switch,
    FormErrorMessage,
    useToast,
    Center,
    Spinner,
    Text
} from '@chakra-ui/react'
import React, { useState, useContext } from 'react'
import DisplayFieldText from './DisplayFieldText'
import HorseDataContext from '../contexts/HorseDataContext'

/*
* Modal displaying details of the object, an edit mode is available
* when toggled - form input fields are made available
*/
const FormModal = ({isOpen, onClose, item, title}) => {

    // --- STATES ---
    const {setDataItems, dataItems} = useContext(HorseDataContext)
    const [editSwitch, setEditSwitch] = useState(false);
    const [formValid, setFormValid] = useState({
        name: title ? true : false,
    });
    const [submitting, setSubmission] = useState(false);
    const [submitButton, setSubmitButton] = useState(true);
    const [currentObject, setCurrentObject] = useState({
        id: item.id,
        name: title,
        height: item.username,
        weight: item.email,
        favoriteFood: item.phone
    });
    const toast = useToast();


    // --- EVENT HANDLERS ---
    /*
    * Reset generic states
    */
    function resetStates(){
        setFormValid({
            name: true
        });
        setSubmission(false);
        setSubmitButton(true);
    }

    /*
    * Modal close handler
    */
    function onCloseHandler(){
        onClose();
        setEditSwitch(false);
        resetStates();
    }

    /*
    */
    function editToggleHandler(){
        setEditSwitch(!editSwitch);
        resetStates();
    }

    /*
    * Input change handler
    */
    const inputChangeHandler = (e) => {
        const { dataset, value } = e.target;
        const keyNode = dataset.keyName;

        setCurrentObject(prevState => ({
            ...prevState,
            [keyNode] : value
        }));

        // Only enable only any input is interacted/changed - discourage "no-change" submissions
        if(submitButton){
            setSubmitButton(false);
        }

    }

    /*
    * Input blur, check if input is valid/invalid
    */
    const inputBlurHandler = (e) => {
        const { dataset, value } = e.target;
        const keyNode = dataset.keyName;
        if(dataset.required){
            setFormValid(prevState => ({
                ...prevState,
                [keyNode] : value ? true : false
            }));
        }
    }

    /*
    * Assign value to main data source, so that the list would reflect the latest values
    */
    function assignDataSource(id, obj){
        let newData = dataItems;
        var foundIndex = newData.findIndex(x => x.id == id);
        const newDataObj = newData[foundIndex];
        newData[foundIndex] = {
            'id': Number(id),
            'name': obj.name ? obj.name : newDataObj.name,
            'address': newDataObj.address,
            'company': newDataObj.company,
            'email': newDataObj.email,
            'phone': newDataObj.phone,
            'username': newDataObj.username,
            'website': newDataObj.website
            // TODO other keys
        };
        setDataItems([...newData]);
        console.log("Testing: ", newData, " ", newData[foundIndex] )
    }

    /*
    * Form submission handler, PATCH to api
    * Show Toast success/failure
    */
    const submitHandler = (e) => {
        // TODO: put PATCH API
        const formValidity = Object.values(formValid).every((v) => v !== false);

        if(formValidity){
            // TODO: Remove Set Timeout
            setSubmission(true);
            setTimeout(()=>{
                assignDataSource(e.target.dataset.form, currentObject);
                toast({
                    title: 'Detail updated',
                    description: "We've updated the details you have provided",
                    status: 'success',
                    duration: 800,
                    isClosable: true,
                })
                onCloseHandler();
            }, 3000)

        } else {
            toast({
                title: 'Error',
                description: "Please address all errors displayed on the inputs before saving",
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
    }
    
    
    return (
        <>
            <Modal
                closeOnOverlayClick={
                    // Overlay can only dismiss the modal if it is not in Edit mode
                    editSwitch ? false : true
                }
                isOpen={isOpen}
                onClose={onCloseHandler}>
                <ModalOverlay />
                <ModalContent>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    {
                        // If edit mode is true - show form fields
                        !submitting && editSwitch
                        &&
                        <Box mt='7'>
                            <FormControl isRequired isInvalid={!formValid.name}>
                                <FormLabel>Name</FormLabel>
                                <Input data-required={true} data-key-name="name" placeholder='Name' defaultValue={title} onChange={inputChangeHandler} onBlur={inputBlurHandler} />
                                {
                                    !formValid.name
                                    &&
                                    <FormErrorMessage>
                                        Enter the name, as it is a required.
                                    </FormErrorMessage>
                                }
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Height</FormLabel>
                                <Input data-key-name="height" placeholder='Height' defaultValue={item.username} onChange={inputChangeHandler}  />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Weight</FormLabel>
                                <Input data-key-name="weight" placeholder='Weight' defaultValue={item.email} onChange={inputChangeHandler}  />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Favorite Food</FormLabel>
                                <Input data-key-name="favoriteFood" placeholder='Favorite Food' defaultValue={item.phone} onChange={inputChangeHandler}  />
                            </FormControl>
                        </Box>
                    }
                    {
                        // If edit mode is false - display text only
                        !submitting && !editSwitch
                        &&
                        <Box mt='7'>
                            {title && <DisplayFieldText fieldName='Name' fieldValue={title}/>}
                            {item.username && <DisplayFieldText fieldName='Height' fieldValue={item.username} />}
                            {item.email && <DisplayFieldText fieldName='Weight' fieldValue={item.email} />}
                            {item.phone && <DisplayFieldText fieldName='Favorite Food' fieldValue={item.phone} />}
                        </Box>
                    }
                    {
                        // Show spinner when submitting details
                        submitting
                        &&
                        <Box h='300' padding='10'>
                            <Text pb='5' color='dimgray' textAlign='center'>Form submission in progress</Text>
                            <Center>
                                <Spinner
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='teal'
                                size='xl'
                                />
                            </Center>
                        </Box>
                    }
                    {
                        // Hide toggler when details are being submitted
                        !submitting
                        &&
                        <FormControl pt={7}>
                            <FormLabel mb='0'>
                                Edit Mode
                            </FormLabel>
                            <Switch id='edit-mode' onChange={editToggleHandler}/>
                        </FormControl>
                    }

                </ModalBody>
                {
                    // If edit mode is true - show additional buttons
                    editSwitch && !submitting
                    &&
                    <ModalFooter>
                        <Button data-form={item.id} colorScheme='blue' mr={3} onClick={submitHandler} isDisabled={submitButton}>
                            Save
                        </Button>
                        <Button onClick={onCloseHandler}>Cancel</Button>
                    </ModalFooter>
                }
                </ModalContent>
            </Modal>
        </>
    )
}

export default FormModal
