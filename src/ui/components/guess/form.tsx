import {
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Button,
  Heading
} from '@chakra-ui/react'
import type { FC } from 'react'
import { FaItunes } from 'react-icons/fa'

import { UIStrings } from '~/lib/i18n/resources'
import type { GuessAlbumProps } from '~/ui/contracts/props'
import { StyleSpaces } from '~/ui/settings/constants'

const GuessAlbumForm: FC<GuessAlbumProps> = props => {
  const { title } = props
  return (
    <Flex
      w="full"
      gap={StyleSpaces.gap}
      textAlign="center"
      flexDirection="column">
      <Heading
        w="full"
        textAlign="center"
        fontSize="md"
        opacity={0.5}
        fontWeight="thin">
        {UIStrings.guessFormTitle}
      </Heading>
      <Heading w="full" textAlign="center" fontSize="xl">
        {title}
      </Heading>
      <Heading
        w="full"
        textAlign="center"
        fontSize="sm"
        opacity={0.5}
        fontWeight="thin">
        {UIStrings.guessFormDescription}
      </Heading>
      <InputGroup>
        <InputLeftAddon
          width={StyleSpaces.size}
          style={{ position: 'relative' }}
          p={0}
          borderLeftRadius={StyleSpaces.borderRadius}>
          <FaItunes
            style={{ position: 'absolute', left: -4 }}
            color="white"
            opacity={0.5}
            size={StyleSpaces.size + 5}
          />
        </InputLeftAddon>
        <Input />
        <InputRightAddon px={0} borderRightRadius={StyleSpaces.borderRadius}>
          <Button
            borderRadius={StyleSpaces.borderRadius}
            size="md"
            variant="ghost"
            colorScheme="transparent">
            {UIStrings.submitArtist}
          </Button>
        </InputRightAddon>
      </InputGroup>
      <Heading
        w="full"
        textAlign="center"
        fontSize="xs"
        opacity={0.5}
        fontWeight="thin">
        {UIStrings.guessFormAddition}
      </Heading>
    </Flex>
  )
}

export { GuessAlbumForm }
