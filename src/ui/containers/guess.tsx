import {
  Button,
  Tag,
  Flex,
  Spinner,
  Divider,
  Progress,
  useBoolean
} from '@chakra-ui/react'
import type { WithRouterProps } from 'next/dist/client/with-router'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import type { FC } from 'react'
import React, { useCallback, useEffect, useState } from 'react'
import { pick } from 'underscore'

import type {
  UserStateData,
  ArtistStateData,
  ErrorMessage,
  ProcessedArtists
} from '~/lib/contracts/types'
import { UIStrings } from '~/lib/i18n/resources'
import { useLogger } from '~/lib/logger'
import { Artist } from '~/lib/services/artist'
import { User } from '~/lib/services/user'
import { Utils } from '~/lib/services/utils'
import { LocalStateSetup } from '~/lib/settings/enums'
import { GuessAlbumForm } from '~/ui/form/guess'
import { UsernameForm } from '~/ui/form/username'
import {
  defaultUserState,
  defaultArtistState,
  StyleSpaces
} from '~/ui/settings/constants'

const GuessForm: FC<WithRouterProps> = props => {
  const { Logger } = useLogger({
    level: 'debug',
    id: 'GuessFormContainer',
    color: 'orange'
  })
  const { router } = props
  const [artistState, setArtistState] = useState<ArtistStateData>({
    ...defaultArtistState
  })
  const [userState, setUserState] = useState<UserStateData>({
    ...defaultUserState
  })
  const [isLoading, { on, off }] = useBoolean(false)

  const setupAlbums = useCallback(() => {
    if (artistState?.selected?.length) {
      return
    }
    on()
    Artist.setupAlbums()
      .then(state => {
        Logger.d(state)
        setArtistState(state)
        return User.requestUserState()
      })
      .then(state => {
        Logger.d('Setup state', state)
        setUserState(state)
        off()
      })
  }, [
    on,
    off,
    setUserState,
    setArtistState,
    artistState?.selected?.length,
    Logger
  ])

  useEffect(() => {
    setupAlbums()
    return () => {
      Artist.setupAlbums.cancel()
      User.requestUserState.cancel()
    }
  }, [setupAlbums])

  const onSubmit = useCallback(
    (term: string) => {
      on()
      const score = Utils.guessArtist(artistState.artist, term)
      if (!score) {
        User.updateUserState({
          ...userState,
          prevFailed: true
        }).then(state => {
          setUserState(state)
          off()
        })
        return
      }
      const artists: ProcessedArtists = {
        ...artistState.artists,
        [`${artistState.artist}`]: artistState.artist
      }
      Artist.setupAlbums(artists)
        .then(artistStateUpdate => {
          setArtistState(artistStateUpdate ?? artistState)
          return User.updateUserState({
            ...userState,
            score: score + userState.score,
            prevFailed: false
          })
        })
        .then(userStateUpdate => {
          setUserState(userStateUpdate)
          off()
        })
    },
    [off, on, artistState, userState]
  )

  const onFinish = useCallback(
    (username: string) => {
      setUserState({ ...userState, username })
    },
    [userState, setUserState]
  )

  const sendUser = useCallback(() => {
    const user = {
      ...userState,
      ...pick<typeof window.navigator, keyof typeof window.navigator>(
        window.navigator,
        ['userAgent', 'language']
      )
    }
    Logger.d('User update:', user)
    on()
    User.sendUserData(user).then((state: UserStateData | ErrorMessage) => {
      if ((state as UserStateData)?.id === undefined) {
        Logger.w(state)
        return
      }
      Logger.d(state)
      router.push?.call(this, `/scores/${(state as UserStateData).username}`)
    })
  }, [on, Logger, router.push, userState])

  useEffect(() => {
    if (userState.step === LocalStateSetup.limit && !!userState?.username) {
      sendUser()
    }
    return () => {
      User.sendUserData.cancel()
    }
  }, [sendUser, userState])

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={StyleSpaces.gap}
      w="full">
      <NextSeo title="Home" />
      <Progress
        width="100%"
        hasStripe
        hidden={false}
        value={(100 / +LocalStateSetup.limit) * +userState.step}
      />
      <Divider />
      {userState.step === LocalStateSetup.limit && !userState.username ? (
        <UsernameForm {...{ onFinish }} />
      ) : (
        <React.Suspense fallback={<Spinner />}>
          <GuessAlbumForm
            {...{ onSubmit }}
            title={isLoading ? '' : artistState?.selected[userState.step]}
          />
        </React.Suspense>
      )}
      <Divider />
      <Tag
        aria-label={`${userState.score}`}>{`${UIStrings.scoreText}: ${userState.score}`}</Tag>
      <Flex
        w="full"
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        gap={StyleSpaces.gap}>
        <Link href="/scores">
          <Button>{UIStrings.scoresListButton}</Button>
        </Link>
        {userState?.username ? (
          <Link href={`/scores/${userState.username}`}>
            <Button>{UIStrings.userScoreLinkText}</Button>
          </Link>
        ) : (
          <></>
        )}
      </Flex>
    </Flex>
  )
}

const GuessFormContainer = withRouter(GuessForm)

export { GuessFormContainer }
