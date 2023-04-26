import { Button, Flex } from '@chakra-ui/react'
import type { FC } from 'react'
import { AiFillGithub } from 'react-icons/ai'

import { UIStrings } from '~/lib/i18n/resources'
import { CentredFlex, StyleSpaces } from '~/ui/settings/constants'

const HelperRepoLink: FC = () => {
  return (
    <Flex {...CentredFlex} gap={StyleSpaces.gap}>
      <Button
        as="a"
        href={UIStrings.repoLink}
        target="_blank"
        leftIcon={<AiFillGithub />}
        size="sm">
        {UIStrings.repoLinkText}
      </Button>
    </Flex>
  )
}

export { HelperRepoLink }
