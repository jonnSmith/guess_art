import type {
  ArtistData,
  EnvSettings,
  SelectAlbumsData
} from '~/lib/contracts/types'
import { EnvDataKey, ParseSettings } from '~/lib/settings/enums'

class ArtistsService {
  private static artists: Array<string> = []

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
    const response = await fetch('/api/artist')
    const result = await response.json()
    return { ...result }
  }

  async requestAlbums(term: string): Promise<ArtistData> {
    const response = await fetch(`/api/artist/${term}`)
    const result = await response.json()
    return { ...result }
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
}

const Artists = new ArtistsService()
export { Artists }
