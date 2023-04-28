import { ApiBooleanFlag, LanguageLocale } from '~/lib/settings/enums'

const API_URL = 'https://itunes.apple.com'
const defaultHeaders = {
  'Content-Type': 'application/json'
}
const searchRequest = {
  entity: 'musicArtist',
  attribute: 'artistTerm',
  limit: '1'
}
const lookupRequest = {
  entity: 'album',
  sort: 'recent'
}
const requestParams = {
  media: 'music',
  lang: LanguageLocale.en,
  explicit: ApiBooleanFlag.No
}
const fetchParams = {
  referrerPolicy: 'same-origin',
  keepalive: true,
  cache: 'no-cache',
  credentials: 'same-origin',
  method: 'GET'
}
const skipWorldsCompare = ['the']

export {
  API_URL,
  defaultHeaders,
  fetchParams,
  requestParams,
  lookupRequest,
  searchRequest,
  skipWorldsCompare
}
