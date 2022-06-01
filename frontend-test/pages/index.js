import { Box } from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import DisplayCardList from '../components/DisplayCardList'
import React, { useState } from 'react';
import HorseDataContext from '../contexts/HorseDataContext';

/*
* Retrives data from api, with a limit on load
* @return {array} - of horses (object)
*/
export const getServerSideProps = async () => {
  const uri = 'https://jsonplaceholder.typicode.com/comments?_limit=10';
  let header = new Headers();
  header.append('Accept', 'application/json')
  const response =  await fetch(uri, {
    method: "GET",
    headers: header
  });

  if (response.ok){
    const data = await response.json();
    const numberOfData = response?.headers.get('x-total-count');
    return {
      props: {
        data,
        numberOfData: +numberOfData,
      }
    }
  } else {
    return Promise.reject(response);
  }
}

/*
* Displays a list of data in a responsive grid
* @param data - object of horses fetched
* @param numberOfData - total horses in api (when not limited)
*/
export default function Home({ data, numberOfData }) {

  // --- STATES ---
  const [dataItems, setDataItems] = useState(data)

  return (
    <div className={styles.container}>
      <HorseDataContext.Provider value={{dataItems, setDataItems}}>
        <Box bg='whitesmoke' p='10'>
          <main className={styles.main}>
            <DisplayCardList data={dataItems} icon='/horse.png' title='name' numberOfData={numberOfData} />
          </main>
        </Box>
      </HorseDataContext.Provider>
    </div>
  )
}
