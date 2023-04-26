import type {
  EnvDataKey,
  WrapperType,
  ResponseCode
} from '~/lib/settings/enums'

import ProcessEnv = NodeJS.ProcessEnv

type ArtistRequest = { term: string }
interface ApiRequestParams extends Partial<ArtistRequest> {
  id?: string | undefined
}
type AlbumData = string

interface ArtistData {
  id?: string
  time?: Date | string
  term: string
  artistId: string
  albums: Array<AlbumData>
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
interface UserStateData {
  step: number
  score: number
  artist: string
  selected: Array<AlbumData>
}

type Merge<P, T> = Omit<P, keyof T> & T

export type {
  ArtistData,
  AlbumData,
  UserStateData,
  ArtistRequest,
  ApiRequestParams,
  ApiResponseData,
  ApiDataFilterFunction,
  ApiDataFilterParams,
  WrapperTypeKey,
  MusicEntityData,
  EnvSettings,
  ResponseCodeKey,
  ResponseCodeValue,
  ErrorMessage,
  SelectAlbumsData,
  Merge
}
