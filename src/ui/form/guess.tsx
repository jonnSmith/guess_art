import {
  Spinner,
  Divider,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon
} from '@chakra-ui/react'
import type { ChangeEvent, FC } from 'react'
import { useCallback, useState } from 'react'
import { FaItunes } from 'react-icons/fa'

import { UIStrings } from '~/lib/i18n/resources'
import type { GuessAlbumProps } from '~/ui/contracts/props'
import { CentredFlex, StyleSpaces } from '~/ui/settings/constants'

const GuessAlbumForm: FC<GuessAlbumProps> = props => {
  const { title, onSubmit } = props

  const [input, setInput] = useState('')
  const [isError, setError] = useState<boolean>(false)
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }
  const onClick = useCallback(() => {
    setError(input === '' || title === '')
    if (!input || !title) {
      return
    }
    onSubmit?.call(this, input)
    setInput('')
  }, [input, title, onSubmit])

  return (
    <Flex
      w="full"
      gap={StyleSpaces.gap}
      textAlign="center"
      {...CentredFlex}
      flexDirection="column">
      <Heading
        w="full"
        fontSize="md"
        fontWeight="thin"
        textAlign="center"
        opacity={0.5}>
        {UIStrings.guessFormTitle}
      </Heading>
      <Divider />
      {title ? (
        <Heading
          w="full"
          textAlign="center"
          style={{
            maxWidth: '80%',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
          fontSize="xl">
          {title}
        </Heading>
      ) : (
        // TODO: replace with suspense, fix suspense logic
        <Spinner />
      )}
      <FormControl as="fieldset" flexDirection="column" gap={StyleSpaces.p}>
        <FormLabel as="legend" opacity={0.5} color={isError ? 'red' : 'gray'}>
          {isError
            ? UIStrings.requiredArtistError
            : UIStrings.guessFormDescription}
        </FormLabel>
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
          <Input required type="text" {...{ onChange }} value={input} />
          <InputRightAddon px={0} borderRightRadius={StyleSpaces.borderRadius}>
            <Button
              disabled={!input || !title}
              {...{ onClick }}
              borderRadius={StyleSpaces.borderRadius}
              size="md"
              variant="ghost"
              colorScheme="transparent">
              {UIStrings.submitArtist}
            </Button>
          </InputRightAddon>
        </InputGroup>
        <FormLabel opacity={0.5}>{UIStrings.guessFormAddition}</FormLabel>
      </FormControl>
    </Flex>
  )
}

export { GuessAlbumForm }
