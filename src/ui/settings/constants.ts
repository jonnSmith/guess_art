import type { HelperImageProps } from '~/ui/contracts/props'

const HelperImageDefaults: Partial<HelperImageProps> = {
  label: '',
  size: 5
}

const TechStackLogotypes = (colorMode: string): Array<HelperImageProps> => [
  { src: `/nextjs-icon-${colorMode}.svg`, label: 'NextJS' },
  { src: `/chakra-ui-logomark-colored.svg`, label: 'Chakra UI' },
  { src: '/ts-logo-512.svg', label: 'TypeScript' },
  { src: '/favicon.ico', label: 'iTunes' }
]

const StyleSpaces = {
  gap: 5,
  borderRadius: 8,
  p: 2,
  size: 42,
  cell: 300
}

const CentredFlex = {
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex'
}

const SeoSettings = {
  applicationName: 'guess_art',
  faviconLink: '/favicon.ico',
  manifestLink: '/manifest.json'
}

const defaultUserState = {
  step: 0,
  score: 0,
  prevFailed: false,
  username: ''
}

const defaultArtistState = {
  step: 0,
  score: 0,
  artist: '',
  selected: [],
  prevFailed: false
}

export {
  HelperImageDefaults,
  CentredFlex,
  StyleSpaces,
  SeoSettings,
  defaultUserState,
  defaultArtistState,
  TechStackLogotypes
}
