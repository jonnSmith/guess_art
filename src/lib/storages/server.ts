import { PrismaClient } from '@prisma/client'
import { pick } from 'underscore'

import type {
  ArtistData,
  EnvSettings,
  ArtistRequest,
  AlbumData,
  ArtistDBData,
  UserDBData,
  UserStateData,
  UserRequest
} from '~/lib/contracts/types'
import { EnvDataKey, ParseSettings } from '~/lib/settings/enums'
import { defaultUserState } from '~/ui/settings/constants'

class ServerStorageService {
  private url: string | undefined

  private static client: PrismaClient | undefined

  constructor() {
    this.SETUP_URL = { ...process.env } as unknown as EnvSettings
  }

  get envUrlKey() {
    return EnvDataKey.dbUrl
  }

  set SETUP_URL(env: EnvSettings) {
    const url: string | undefined = env[`${this.envUrlKey}`]
    if (url === undefined) {
      throw new Error(`ENVIRONMENT IS NOT SET, DB SETUP CANCELLED`)
    }
    this.url = url
    this.SETUP_PRISMA()
  }

  get DB_URL() {
    if (this.url === undefined) {
      this.SETUP_URL = { ...process.env } as unknown as EnvSettings
    }
    return `${this.url}`
  }

  SETUP_PRISMA() {
    if (ServerStorageService.client !== undefined) {
      return
    }
    ServerStorageService.client = new PrismaClient()
  }

  get PRISMA() {
    if (ServerStorageService.client === undefined) {
      ServerStorageService.client = new PrismaClient()
    }
    return ServerStorageService.client
  }

  stringifyAlbums(albums: Array<AlbumData>): string {
    return albums.join(ParseSettings.joinAlbum)
  }

  parseAlbums(albums: string | null | undefined): Array<AlbumData> {
    if (albums === undefined || !albums) {
      return []
    }
    return albums.split(ParseSettings.joinAlbum)
  }

  public async setArtist(data: ArtistData): Promise<string> {
    const artist = await this.PRISMA.artist.create({
      data: {
        ...data,
        albums: String(this.stringifyAlbums(data.albums))
      }
    })
    return artist.id
  }

  private transformArtistData(data: ArtistDBData) {
    return { ...data, albums: this.parseAlbums(data?.albums) }
  }

  public async getArtist(
    params: ArtistRequest
  ): Promise<ArtistData | undefined> {
    const { term } = params
    const data = await this.PRISMA.artist.findFirst({
      where: {
        term: String(term)
      }
    })
    if (data?.id === undefined) {
      return undefined
    }
    return this.transformArtistData(data as ArtistDBData)
  }

  public async isArtistAlbum(
    params: ArtistRequest
  ): Promise<ArtistData | undefined> {
    const { term } = params
    const data = await this.PRISMA.artist.findFirst({
      where: {
        albums: { contains: String(term) }
      }
    })
    if (data?.term === undefined) {
      return undefined
    }
    return this.transformArtistData(data as ArtistDBData)
  }

  public async getUsers(): Promise<Array<UserDBData>> {
    const data = await this.PRISMA.user.findMany()
    if (data === undefined) {
      return []
    }
    return data
  }

  public async insertUser(user: UserStateData): Promise<UserStateData> {
    const userDbData = await this.PRISMA.user.create({
      data: {
        ...pick<UserStateData, keyof UserStateData>(user, [
          'username',
          'userAgent',
          'language',
          'score'
        ])
      }
    })
    return { ...defaultUserState, ...userDbData }
  }

  public async updateUser(user: UserStateData): Promise<UserStateData> {
    const userDbData = await this.PRISMA.user.update({
      data: { ...pick<UserStateData, keyof UserStateData>(user, 'score') },
      where: { id: user.id }
    })
    return { ...defaultUserState, ...userDbData }
  }

  public async getUser(
    params: UserRequest
  ): Promise<UserStateData | undefined> {
    const { username } = params
    const data = await this.PRISMA.user.findFirst({
      where: {
        username: String(username)
      }
    })
    if (data?.id === undefined) {
      return undefined
    }
    return { ...defaultUserState, ...data }
  }
}

export { ServerStorageService }
