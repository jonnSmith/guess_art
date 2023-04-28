import {
  Button,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import type { FC } from 'react'
import { useCallback, useEffect, useState } from 'react'

import type { UserRecordData, UsersRecordsData } from '~/lib/contracts/types'
import { UIStrings } from '~/lib/i18n/resources'
import { useLogger } from '~/lib/logger'
import { User } from '~/lib/services/user'
import { StyleSpaces } from '~/ui/settings/constants'

const ScoresListContainer: FC = () => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  const [users, setUsers] = useState<Array<UserRecordData>>([])
  const { Logger } = useLogger({
    level: 'debug',
    id: 'ScoresListContainer',
    color: 'lightgreen'
  })
  const setupUsers = useCallback(() => {
    if (users?.length) {
      return
    }
    User.queryUsersData().then(state => {
      if ((state as UsersRecordsData)?.users === undefined) {
        Logger.w('Setup users', state)
        return
      }
      Logger.d('Setup users', state)
      setUsers((state as UsersRecordsData)?.users)
    })
  }, [setUsers, users, Logger])

  useEffect(() => {
    setupUsers()
    return () => {
      User.queryUsersData.cancel()
    }
  }, [setupUsers])

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={StyleSpaces.gap}
      w="full">
      <NextSeo title={UIStrings.usersScoresTitle} />
      <Flex
        w="full"
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        gap={StyleSpaces.gap}>
        <Link type="button" href="/">
          <Button>{UIStrings.guessFormButton}</Button>
        </Link>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>{UIStrings.usersScoresTitle}</TableCaption>
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map(u => (
              <Tr key={`field-${u.username}`}>
                <Td>{u.username}</Td>
                <Td>{u.score}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  )
}

export { ScoresListContainer }
