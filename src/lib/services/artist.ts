import { debounce } from 'underscore'

import type {
  ArtistData,
  EnvSettings,
  SelectAlbumsData,
  AlbumData,
  ArtistStateData
} from '~/lib/contracts/types'
import { Utils } from '~/lib/services/utils'
import {
  LocalStateSetup,
  EnvDataKey,
  ParseSettings,
  NextApiLayers
} from '~/lib/settings/enums'
import { ClientStorageService } from '~/lib/storages/client'
import { defaultArtistState } from '~/ui/settings/constants'

class ArtistsService {
  private static artists: Array<string> = []

  private static clientStorage: ClientStorageService

  get LocalDB() {
    if (ArtistsService.clientStorage === undefined) {
      ArtistsService.clientStorage = new ClientStorageService()
    }
    return ArtistsService.clientStorage
  }

  parseArtist(term: string) {
    return `${term}`
      .split(`${ParseSettings.spaceArtist}`)
      .map(t => `${t.charAt(0).toUpperCase()}${t.slice(1).toLowerCase()}`)
      .join(' ')
  }

  parseArtists(env: EnvSettings) {
    const artistsString = env[`${EnvDataKey.artistsString}`]
    if (artistsString === undefined) {
      throw new Error('ARTISTS ARE NOT DEFINED, CANCELLED')
    }
    return artistsString
      .split(ParseSettings.joinArtist)
      .map(this.parseArtist) as Array<string>
  }

  set Artists(env: EnvSettings) {
    if (ArtistsService.artists.length > 0) {
      return
    }
    ArtistsService.artists = this.parseArtists(env)
  }

  get Artist() {
    const index = Math.floor(Math.random() * ArtistsService.artists.length)
    return ArtistsService.artists[index]
  }

  getArtist(env: EnvSettings) {
    if (!ArtistsService.artists.length) {
      this.Artists = { ...env }
    }
    return this.Artist
  }

  async requestArtist(): Promise<{ artist: string }> {
    const response = await fetch(
      `/${NextApiLayers.root}/${NextApiLayers.artist}`
    )
    const result = await response.json()
    return { ...result }
  }

  async requestAlbums(term: string): Promise<ArtistData> {
    const response = await fetch(
      `/${NextApiLayers.root}/${NextApiLayers.artist}/${term}`
    )
    const result = await response.json()
    return { ...result }
  }

  filterObviousAlbums(albums: Array<AlbumData>, artist: string) {
    const filter = Utils.isAlbumNotObvious(artist)
    return albums.filter(filter)
  }

  selectAlbums(data: SelectAlbumsData): SelectAlbumsData {
    const { albums, selected, limit } = data
    if (selected.length === limit || !albums.length) {
      return { ...data }
    }
    const index = Math.floor(Math.random() * albums.length)
    return this.selectAlbums({
      limit,
      selected: [...selected, albums[index]],
      albums: albums.filter((_, i) => i !== index)
    })
  }

  public setupAlbums = debounce(
    async (rewrite = false): Promise<ArtistStateData> => {
      let state = await this.LocalDB.Storage.getItem<ArtistStateData>(
        LocalStateSetup.artistStateKey
      )
      if (!rewrite && state?.selected?.length) {
        return { ...state }
      }
      const { artist } = await this.requestArtist()
      if (artist === undefined) {
        return { ...defaultArtistState }
      }
      const { albums } = await this.requestAlbums(artist)
      const { selected } = this.selectAlbums({
        selected: [],
        albums: this.filterObviousAlbums(albums, artist),
        limit: +LocalStateSetup.limit
      })
      state = { artist, selected }
      await this.LocalDB.Storage.setItem(LocalStateSetup.artistStateKey, state)
      return state
    },
    1,
    true
  )
}

const Artist = new ArtistsService()
export { Artist }
