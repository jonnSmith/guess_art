import type {
  ApiRequestParams,
  ApiResponseData,
  ArtistRequest,
  MusicEntityData,
  ApiDataFilterFunction,
  ApiDataFilterParams,
  ArtistData
} from '~/lib/contracts/types'
import {
  API_URL,
  fetchParams,
  lookupRequest,
  requestParams,
  searchRequest
} from '~/lib/settings/constants'
import { ApiLayers, WrapperType } from '~/lib/settings/enums'
import { ServerStorageService } from '~/lib/storages/server'

class ITunesService {
  private readonly API_URL: string

  private readonly headers: Headers

  private dbInstance: ServerStorageService | undefined

  constructor() {
    this.API_URL = API_URL
    this.headers = new Headers({
      'Content-Type': 'application/json'
    })
  }

  get requestConfig() {
    return {
      ...fetchParams,
      headers: this.headers
    } as RequestInit
  }

  get DB() {
    if (this.dbInstance === undefined) {
      this.dbInstance = new ServerStorageService()
    }
    return this.dbInstance
  }

  public requestURL(params: ApiRequestParams) {
    const { id } = params
    const url = `${this.API_URL}/${
      id === undefined ? ApiLayers.search : ApiLayers.lookup
    }`
    const getParams = new URLSearchParams({
      ...requestParams,
      ...(id === undefined ? searchRequest : lookupRequest),
      ...params
    })
    return `${url}?${getParams.toString()}`
  }

  public parseArtist(result: ApiResponseData) {
    const filter = this.filterData({ type: WrapperType.artist })
    return Array.isArray(result?.results)
      ? result?.results.filter(filter)[0]
      : {}
  }

  public async requestData(params: ApiRequestParams) {
    const response = await fetch(
      this.requestURL({ ...params }),
      this.requestConfig
    )
    return response.json()
  }

  public filterData(params: ApiDataFilterParams): ApiDataFilterFunction {
    const { id, type, term } = params
    if (id === undefined) {
      return (m: MusicEntityData) => m.wrapperType === type
    }
    if (type !== WrapperType.collection) {
      return (a: MusicEntityData) => a.wrapperType === type && a.artistId === id
    }
    if (term === undefined) {
      return (a: MusicEntityData) =>
        a.wrapperType === type &&
        a.artistId === id &&
        a.collectionName !== undefined
    }
    return (a: MusicEntityData) =>
      a.wrapperType === type &&
      a.artistId === id &&
      a.collectionName !== undefined &&
      !a.collectionName.toLowerCase().match(`/${term.toLowerCase()}/gi`)
  }

  public checkRequest(params: ArtistRequest) {
    if (params.term === undefined) {
      throw new Error('ARTIST NAME SEARCH REQUEST IS EMPTY, CANCELLED')
    }
  }

  public parseAlbums(data: Array<MusicEntityData>, id: string, term?: string) {
    const filter = this.filterData({ type: WrapperType.collection, id, term })
    return data.filter(filter).map(e => e.collectionName) as Array<string>
  }

  public async requestArtistAlbums(params: ArtistRequest): Promise<ArtistData> {
    this.checkRequest(params)
    let response: ArtistData | undefined = await this.DB.getArtist({
      ...params
    })
    if (response !== undefined) {
      return { ...response }
    }
    const artistData = await this.requestData({ ...params })
    const artist = this.parseArtist(artistData)
    if (artist?.artistId === undefined) {
      throw new Error('ARTIST NAME IS NOT FOUND ON ITUNES, CANCELLED')
    }
    const { artistId } = artist
    const albumsData = await this.requestData({ id: artistId })
    const albums = this.parseAlbums(albumsData.results, artistId, params?.term)
    response = { ...params, artistId: `${artistId}`, albums }
    const id = await this.DB.setArtist({ ...response })
    return { id, ...response }
  }
}

const iTunesAPI = new ITunesService()

export { iTunesAPI }
