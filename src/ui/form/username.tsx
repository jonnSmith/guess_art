import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon
} from '@chakra-ui/react'
import type { FC, ChangeEvent } from 'react'
import { useCallback, useState } from 'react'
import { FaUser } from 'react-icons/fa'

import { UIStrings } from '~/lib/i18n/resources'
import { useLogger } from '~/lib/logger'
import type { UsernameFormProps } from '~/ui/contracts/props'
import { StyleSpaces } from '~/ui/settings/constants'

const UsernameForm: FC<UsernameFormProps> = props => {
  const { Logger } = useLogger({
    color: 'blue',
    id: 'UsernameForm',
    level: 'debug'
  })
  const { onFinish } = props
  const [input, setInput] = useState('')
  const [isError, setError] = useState<boolean>(false)
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }
  const onClick = useCallback(() => {
    setError(input === '')
    if (!isError) {
      Logger.d(input)
      onFinish(input)
      setInput('')
    }
  }, [Logger, input, isError, onFinish])

  return (
    <Flex
      w="full"
      gap={StyleSpaces.gap}
      textAlign="center"
      flexDirection="column">
      <FormControl as="fieldset" flexDirection="column" gap={StyleSpaces.p}>
        <FormLabel as="legend" opacity={0.5} color={isError ? 'red' : 'white'}>
          {isError
            ? UIStrings.requiredUsernameError
            : UIStrings.usernameFormDescription}
        </FormLabel>
        <InputGroup>
          <InputLeftAddon
            width={StyleSpaces.size}
            style={{ position: 'relative' }}
            p={0}
            borderLeftRadius={StyleSpaces.borderRadius}>
            <FaUser
              style={{ position: 'absolute', left: 8 }}
              color="white"
              opacity={0.5}
              size={StyleSpaces.size / 2 + 5}
            />
          </InputLeftAddon>
          <Input required type="text" {...{ onChange }} value={input} />
          <InputRightAddon px={0} borderRightRadius={StyleSpaces.borderRadius}>
            <Button
              {...{ onClick }}
              borderRadius={StyleSpaces.borderRadius}
              size="md"
              variant="ghost"
              colorScheme="transparent">
              {UIStrings.submitUsername}
            </Button>
          </InputRightAddon>
        </InputGroup>
        <FormLabel opacity={0.5}>{UIStrings.usernameFormAddition}</FormLabel>
      </FormControl>
    </Flex>
  )
}

export { UsernameForm }
