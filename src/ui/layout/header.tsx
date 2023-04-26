import { Flex, Heading } from '@chakra-ui/react'
import type { FC } from 'react'

import { ThemeToggle } from '../components/theme/toggle'
import { UIStrings } from '~/lib/i18n/resources'
import { StyleSpaces } from '~/ui/settings/constants'

const Header: FC = () => {
  return (
    <Flex
      as="header"
      width="full"
      gap={StyleSpaces.gap}
      flexDirection="row"
      justifyContent="center"
      alignContent="center">
      <Heading display="flex">{UIStrings.title}</Heading>
      <Flex>
        <ThemeToggle />
      </Flex>
    </Flex>
  )
}

export { Header }
