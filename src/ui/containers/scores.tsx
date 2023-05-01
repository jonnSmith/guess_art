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

import type {
  UserRecordData,
  UsersRecordsData,
  UserStateData
} from '~/lib/contracts/types'
import { UIStrings } from '~/lib/i18n/resources'
import { useLogger } from '~/lib/logger'
import { User } from '~/lib/services/user'
import { ScoresPlaceholder } from '~/ui/components/helper/scores.placeholder'
import { defaultUserState, StyleSpaces } from '~/ui/settings/constants'

const ScoresListContainer: FC = () => {
  const [users, setUsers] = useState<Array<UserRecordData>>()
  const [user, setUser] = useState<UserStateData>()
  const { Logger } = useLogger({
    level: 'debug',
    id: 'ScoresListContainer',
    color: 'lightgreen'
  })
  const setupUsers = useCallback(() => {
    if (users !== undefined && user !== undefined) {
      return
    }
    User.queryUsersData()
      .then(state => {
        if ((state as UsersRecordsData)?.users !== undefined) {
          setUsers((state as UsersRecordsData)?.users)
        }
        Logger.d('Setup users', state)

        return User.requestUserState()
      })
      .then(state => {
        let userState = { ...defaultUserState }
        if (state?.id !== undefined) {
          userState = { ...state }
        }
        setUser(userState)
        Logger.d('Setup user', state)
      })
  }, [users, user, Logger])

  useEffect(() => {
    setupUsers()
    return () => {
      User.queryUsersData.cancel()
      User.requestUserState.cancel()
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
      {users?.length ? (
        <TableContainer>
          <Table variant="simple">
            <TableCaption>{UIStrings.usersScoresTitle}</TableCaption>
            <Thead>
              <Tr>
                <Th>{UIStrings.usersScoresTableColumnName}</Th>
                <Th>{UIStrings.usersScoresTableColumnScore}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map(u => (
                <Tr key={`field-${u.username}`}>
                  <Td>
                    <Link
                      style={{
                        textDecoration: 'underline',
                        fontWeight:
                          u.username === user?.username ? 'bold' : 'normal'
                      }}
                      href={`/scores/${u.username}`}>
                      {u.username}
                    </Link>
                  </Td>
                  <Td>{u.score}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        // TODO: replace with suspense, fix suspense logic
        <ScoresPlaceholder length={users?.length} />
      )}
      <Flex
        w="full"
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        gap={StyleSpaces.gap}>
        {user ? (
          <Link type="button" href="/">
            <Button>
              {user?.username
                ? UIStrings.guessFormButtonUser
                : UIStrings.guessFormButton}
            </Button>
          </Link>
        ) : (
          <></>
        )}
        {user?.id ? (
          <Link type="button" href={`/scores/${user.username}`}>
            <Button>{UIStrings.userScoreLinkText}</Button>
          </Link>
        ) : (
          <></>
        )}
      </Flex>
    </Flex>
  )
}

export { ScoresListContainer }
