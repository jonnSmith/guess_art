import type {
  EnvDataKey,
  WrapperType,
  ResponseCode,
  UserDBRecord
} from '~/lib/settings/enums'

import ProcessEnv = NodeJS.ProcessEnv

type ArtistRequest = { term: string }
type UserRequest = { username: string }
type AlbumData = string
interface ApiRequestParams extends Partial<ArtistRequest> {
  id?: string | undefined
}
interface ArtistData {
  id?: string
  time?: Date | string
  term: string
  artistId: string
  albums: Array<AlbumData>
}
type ProcessedArtists = { [key: string]: string }
interface ArtistStateData {
  artist: string
  selected: Array<AlbumData>
  artists: ProcessedArtists
}
type ArtistDBData = ArtistData & {
  albums: string
}
type WrapperTypeKey = keyof typeof WrapperType
interface MusicEntityData {
  artistId?: string | undefined
  wrapperType?: WrapperTypeKey
  collectionName?: string
}
interface ApiResponseData {
  resultsNumber: number
  results: Array<MusicEntityData>
}
type ApiDataFilterFunction = (m: MusicEntityData) => boolean
interface ApiDataFilterParams {
  type: WrapperTypeKey
  id?: string | undefined
  term?: string | undefined
}
type EnvSettings = ProcessEnv & { [key in EnvDataKey]: string }
type ResponseCodeKey = keyof typeof ResponseCode
type ResponseCodeValue = (typeof ResponseCode)[ResponseCodeKey]
interface ErrorMessage {
  error: string
}
interface SelectAlbumsData {
  albums: Array<AlbumData>
  selected: Array<AlbumData>
  limit: number
}
interface ScoreData {
  score: number
}
interface UserDBData extends ScoreData {
  id?: string
  username: string
  userAgent?: string | null
  language?: string | null
}
interface UserStateData extends UserDBData {
  step: number
  prevFailed: boolean
}
type UserRecordFields = keyof typeof UserDBRecord
type UserRecordData = Pick<UserDBData, UserRecordFields>
type UsersRecordsData = { users: Array<UserRecordData> }
interface IsActualParams {
  TTL?: string
  time?: Date | string | null
}

type Merge<P, T> = Omit<P, keyof T> & T

export type {
  Merge,
  UserDBData,
  ScoreData,
  AlbumData,
  ArtistData,
  ArtistDBData,
  EnvSettings,
  ErrorMessage,
  UserStateData,
  ArtistStateData,
  ArtistRequest,
  UserRequest,
  WrapperTypeKey,
  ResponseCodeKey,
  MusicEntityData,
  ApiResponseData,
  SelectAlbumsData,
  ApiRequestParams,
  ResponseCodeValue,
  ApiDataFilterParams,
  ApiDataFilterFunction,
  ProcessedArtists,
  UserRecordFields,
  UsersRecordsData,
  UserRecordData,
  IsActualParams
}
