import { Flex, Text } from '@chakra-ui/react'
import type { FC } from 'react'

import { UIStrings } from '~/lib/i18n/resources'
import { HelperLogotypes } from '~/ui/components/helper/logotypes'
import { HelperRepoLink } from '~/ui/components/helper/repo'
import { CentredFlex, StyleSpaces } from '~/ui/settings/constants'

const Footer: FC = () => {
  return (
    <Flex
      flexDirection="column"
      as="footer"
      width="full"
      gap={StyleSpaces.gap}
      {...CentredFlex}>
      <Text width="full" {...CentredFlex} fontSize="sm">
        {UIStrings.footerText}
      </Text>
      <HelperLogotypes />
      <HelperRepoLink />
    </Flex>
  )
}

export { Footer }
