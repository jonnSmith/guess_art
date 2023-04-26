import { Flex } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import type { FC } from 'react'
import { useCallback, useEffect, useState } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { debounce } from 'underscore'

import type { AlbumData } from '~/lib/contracts/types'
import { Artists } from '~/lib/services/artists'
import { GuessAlbumForm } from '~/ui/components/guess/form'
import { StyleSpaces } from '~/ui/settings/constants'

const Home: FC = () => {
  const requestAlbums = debounce(
    async () => {
      const { artist } = await Artists.requestArtist()
      if (artist === undefined) {
        return ''
      }
      const { albums } = await Artists.requestAlbums(artist)
      return Artists.selectAlbums({ selected: [], albums, limit: 5 })?.selected
    },
    1,
    true
  )
  const [albums, setAlbums] = useState<Array<AlbumData>>([])
  const setupAlbums = useCallback(() => {
    if (albums?.length) {
      return
    }
    requestAlbums().then(result => {
      setAlbums(result as AlbumData[])
    })
  }, [setAlbums, albums, requestAlbums])

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
      <GuessAlbumForm title={albums[0]} />
    </Flex>
  )
}

export default Home
