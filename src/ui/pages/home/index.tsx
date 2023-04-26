import { Flex } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import type { FC } from 'react'
import { useCallback, useEffect, useState } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { debounce } from 'underscore'

import type { UserStateData } from '~/lib/contracts/types'
import { Artists } from '~/lib/services/artists'
import { ClientStorageService } from '~/lib/storages/client'
import { GuessAlbumForm } from '~/ui/components/guess/form'
import { defaultState, StyleSpaces } from '~/ui/settings/constants'

const Home: FC = () => {
  const clientStorage = new ClientStorageService()
  const [userState, setUserState] = useState<UserStateData>({ ...defaultState })
  const requestAlbums = debounce(
    async () => {
      let state = await clientStorage.Storage.getItem<UserStateData>('state')
      if (state?.selected?.length) {
        return { ...defaultState, ...state }
      }
      const { artist } = await Artists.requestArtist()
      if (artist === undefined) {
        return ''
      }
      const { albums } = await Artists.requestAlbums(artist)
      const { selected } = Artists.selectAlbums({
        selected: [],
        albums,
        limit: 5
      })
      state = { ...defaultState, artist, selected }
      await clientStorage.Storage.setItem('state', state)
      return state
    },
    1,
    true
  )
  const setupAlbums = useCallback(() => {
    if (userState?.selected?.length) {
      return
    }
    requestAlbums().then(state => {
      setUserState({ ...defaultState, ...state })
    })
  }, [userState, setUserState, requestAlbums])

  useEffect(() => {
    setupAlbums()
    return () => {
      requestAlbums.cancel()
    }
  }, [setupAlbums, requestAlbums])

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={StyleSpaces.gap}
      mb={8}
      w="full">
      <NextSeo title="Home" />
      <GuessAlbumForm title={userState?.selected[0]} />
    </Flex>
  )
}

export default Home
