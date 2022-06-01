import DisplayCardItem from "./DisplayCardItem"
import { 
    SimpleGrid,
    Center,
    Spinner
} from '@chakra-ui/react'
import InfiniteScroll from "react-infinite-scroll-component"
import { useState, useEffect, useContext } from "react";
import HorseDataContext from '../contexts/HorseDataContext'

/*
* Displays a list of data in a responsive grid
* @param data - array of object to loop over and display values
* @param icon - static icon to display on list
* @param title - specifying which key/attribute to use as the - card item title
* @param numberOfData - count of total items in api (when there is no limit)
*/
const DisplayCardList = ({data, icon, title, numberOfData }) => {
    // --- STATES ---
    const {setDataItems, dataItems} = useContext(HorseDataContext)
    // const [items, setItems] = useState(data);
    const [hasMore, setHasMore] = useState(true);


    // --- HANDLERS ---
    /*
    * Infinite scrolling method, triggered by hitting a certain scrolling trigger point
    */
    const uri = `https://jsonplaceholder.typicode.com/comments?_start=${dataItems.length}&_limit=10`
    let header = new Headers();
    header.append('Accept', 'application/json');

    const getMoreData = async() => {
        let newData;
        const response =  await fetch(uri, {
            method: "GET",
            headers: header
        });

        if (response.ok) {
            newData = await response.json();
            setDataItems(item => [...item, ...newData]);
        } else {
            return Promise.reject(response);
        }
    }

    /*
    * Detect changes in items state, and when it changes check if there are more data 
    * to pull from the api
    */ 
    useEffect(() => {
        setHasMore(numberOfData > dataItems.length)
    }, [dataItems])

    return (
        <>
            <InfiniteScroll
            dataLength={dataItems.length}
            next={getMoreData}
            hasMore={hasMore}
            scrollThreshold='100%'
            style={{ overflow: "unset" }} // Remove second/internal scrollbar
            loader={
            <Center pt='5'>
                <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='teal'
                size='md'
                />
            </Center>
            }
            endMessage={<Center pt='5' color='dimgray'>End</Center>}
            >
                <SimpleGrid columns={{sm: 2, md: 3}} spacing={10} maxW='1000'>
                        {dataItems.map(item => {
                            return <DisplayCardItem 
                                    key={item.id} 
                                    item={item} 
                                    icon={icon} 
                                    title={item[title]} />
                        })}
                </SimpleGrid>
            </InfiniteScroll>
        </>
    )
}

export default DisplayCardList
