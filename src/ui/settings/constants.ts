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
  borderRadius: 5,
  p: 2,
  size: 42
}

const CentredFlex = {
  alignContent: 'center',
  justifyContent: 'center',
  display: 'flex'
}

const SeoSettings = {
  applicationName: 'guess_art',
  faviconLink: '/favicon.ico',
  manifestLink: '/manifest.json'
}

const defaultState = {
  step: 0,
  score: 0,
  artist: '',
  selected: []
}

export {
  HelperImageDefaults,
  CentredFlex,
  StyleSpaces,
  SeoSettings,
  defaultState,
  TechStackLogotypes
}
