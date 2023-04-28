import { Box, SimpleGrid } from '@chakra-ui/react'
import type { FC, PropsWithChildren } from 'react'

import { MotionBox } from '~/ui/components/motion/box'

import { Footer } from './footer'
import { Header } from './header'

const Layout: FC<PropsWithChildren> = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <MotionBox
      animate={{ opacity: 0.75 }}
      transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}>
      <SimpleGrid
        w="full"
        h="100vh"
        justifyContent="center"
        justifyItems="space-around"
        alignItems="center">
        <Header />
        <Box as="main">{children}</Box>
        <Footer />
      </SimpleGrid>
    </MotionBox>
  )
}

export default Layout
