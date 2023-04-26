enum AppSettings {
  name = 'guess_art',
  version = 0.1
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

export {
  ApiLayers,
  ApiBooleanFlag,
  AppSettings,
  EnvDataKey,
  LanguageLocale,
  ResponseCode,
  ParseSettings,
  WrapperType
}
