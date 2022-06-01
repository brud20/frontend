import '../styles/globals.css'
import TitleHeader from '../components/TitleHeader'
import Footer from '../components/Footer'
import Meta from '../components/Meta'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'

/*
* Title and Footer included here, as it will consistently appear
* in all pages rendered
*/
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Meta/>
      <CSSReset/>
      <TitleHeader/>
      <Component {...pageProps} />
      <Footer/>
    </ChakraProvider>
  ) 
}

export default MyApp