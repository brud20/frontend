import Head from 'next/head'

/*
* Consistent meta for browser tab
*/
const Meta = () => {
  return (
    <Head>
        <title>First AML Test</title>
        <meta name="description" content="First AML Front End Technical Test" />
        <meta name="keywords" content="First AML, Front End, test, programming" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default Meta
