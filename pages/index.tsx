import { Text } from '@chakra-ui/layout'
import { Flex } from '@chakra-ui/react'
import type { NextPage } from 'next'
import DefaultLayout from '../components/layouts/DefaultLayout'
import HeroSection from '../components/sections/HeroSection'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Cat Dog Recognition</title>
        <meta property="og:title" content="Cat Dog Recognition" key="title" />
      </Head>
      <HeroSection />
    </DefaultLayout>
  )
}

export default Home
