import { ChakraProvider } from '@chakra-ui/react'
import type { FC, PropsWithChildren } from 'react'

import { customTheme } from '~/lib/styles/theme'

const ChakraHOC: FC<PropsWithChildren> = (props: PropsWithChildren) => {
  const { children } = props
  return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
}

export { ChakraHOC }
