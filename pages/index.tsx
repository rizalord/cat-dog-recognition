import { Text } from '@chakra-ui/layout'
import { Flex } from '@chakra-ui/react'
import type { NextPage } from 'next'
import DefaultLayout from '../components/layouts/DefaultLayout'
import HeroSection from '../components/sections/HeroSection'

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <HeroSection />
    </DefaultLayout>
  )
}

export default Home
