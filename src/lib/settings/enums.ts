enum AppSettings {
  name = 'guess_art',
  version = 1
}

enum ApiLayers {
  search = 'search',
  lookup = 'lookup'
}

enum ApiBooleanFlag {
  Yes = 'Yes',
  No = 'No'
}

enum LanguageLocale {
  en = 'en-US',
  uk = 'uk-UA'
}

enum EnvDataKey {
  dbUrl = 'DATABASE_URL',
  artistsString = 'PREDEFINED_ARTISTS'
}

enum ResponseCode {
  success = 200,
  error = 400
}

enum WrapperType {
  artist = 'artist',
  collection = 'collection'
}

enum ParseSettings {
  joinAlbum = ';',
  joinArtist = ';',
  spaceArtist = '+'
}

enum LocalStateSetup {
  maxScore = 5,
  missCharValue = 1,
  limit = 5,
  userStateKey = 'user',
  artistStateKey = 'artist'
}

enum NextApiLayers {
  root = 'api',
  artist = 'artist',
  album = 'album',
  users = 'users'
}

enum UserDBRecord {
  username = 'username',
  score = 'score'
}

export {
  ApiLayers,
  ApiBooleanFlag,
  AppSettings,
  EnvDataKey,
  LanguageLocale,
  ResponseCode,
  ParseSettings,
  WrapperType,
  NextApiLayers,
  LocalStateSetup,
  UserDBRecord
}
