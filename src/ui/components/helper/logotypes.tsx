import { Flex, useColorMode } from '@chakra-ui/react'

import type { HelperImageProps } from '~/ui/contracts/props'
import { TechStackLogotypes } from '~/ui/settings/constants'

import { HelperRectangleImage } from './image'

const HelperLogotypes = () => {
  const { colorMode } = useColorMode()
  return (
    <Flex gap={2} justifyContent="center" alignItems="center">
      {TechStackLogotypes(colorMode).map((logo: HelperImageProps) => (
        <HelperRectangleImage key={logo.label} {...logo} />
      ))}
    </Flex>
  )
}

export { HelperLogotypes }
