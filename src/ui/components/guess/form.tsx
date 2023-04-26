import {
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Button
} from '@chakra-ui/react'
import type { FC } from 'react'
import { AiOutlineSound } from 'react-icons/ai'

import { UIStrings } from '~/lib/i18n/resources'
import type { GuessAlbumProps } from '~/ui/contracts/props'

const GuessAlbumForm: FC<GuessAlbumProps> = props => {
  const { title } = props
  return (
    <Flex w="full" textAlign="center" flexDirection="column">
      <Flex>
        <Text>{title}</Text>
      </Flex>
      <InputGroup>
        <InputLeftAddon>
          <AiOutlineSound />
        </InputLeftAddon>
        <Input />
        <InputRightAddon>
          <Button size="lg" variant="ghost" colorScheme="blue">
            {UIStrings.submitArtist}
          </Button>
        </InputRightAddon>
      </InputGroup>
    </Flex>
  )
}

export { GuessAlbumForm }
