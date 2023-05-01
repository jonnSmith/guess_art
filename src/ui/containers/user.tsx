import {
  Button,
  Spinner,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Thead,
  Td,
  Th,
  Tr,
  Tbody
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import type { FC } from 'react'
import React, { useCallback, useEffect, useState } from 'react'
import { pick } from 'underscore'

import type { UserStateData } from '~/lib/contracts/types'
import { UIStrings } from '~/lib/i18n/resources'
import { useLogger } from '~/lib/logger'
import { User } from '~/lib/services/user'
import { CellText } from '~/ui/components/helper/cell.text'
import { defaultUserState, StyleSpaces } from '~/ui/settings/constants'

const UserScoreContainer: FC = () => {
  const router = useRouter()
  const { username } = router.query
  const [userState, setUserState] = useState<UserStateData>({
    ...defaultUserState
  })
  const { Logger } = useLogger({
    level: 'debug',
    id: 'UserScoreContainer',
    color: 'green'
  })
  const setupUser = useCallback(() => {
    if (userState?.username || !username) {
      return
    }
    User.queryUserData(`${username}`).then(state => {
      Logger.d('Setup user', state)
      if ((state as UserStateData)?.username !== undefined) {
        setUserState(state as UserStateData)
      }
    })
  }, [userState?.username, username, Logger])

  useEffect(() => {
    setupUser()
    return () => {
      User.queryUserData.cancel()
    }
  }, [setupUser])

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={StyleSpaces.gap}
      w="full">
      <NextSeo title={userState.username} />
      <React.Suspense fallback={<Spinner />}>
        {userState?.username ? (
          <TableContainer>
            <Table variant="simple">
              <TableCaption>{userState?.username}</TableCaption>
              <Thead>
                <Tr>
                  <Th>Field</Th>
                  <Th>Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Object.entries({
                  ...pick(userState, ['id', 'score', 'userAgent', 'language'])
                }).map(u => (
                  <Tr key={`field-${u[0]}`}>
                    <Td>{u[0]}</Td>
                    <Td>
                      <CellText text={`${u[1]}`} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          // TODO: replace with suspense, fix suspense logic
          <Spinner />
        )}
      </React.Suspense>
      <Flex
        w="full"
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        gap={StyleSpaces.gap}>
        <Link href="/">
          <Button>{UIStrings.guessFormButton}</Button>
        </Link>
        <Link href="/scores">
          <Button>{UIStrings.scoresListButton}</Button>
        </Link>
      </Flex>
    </Flex>
  )
}

export { UserScoreContainer }
