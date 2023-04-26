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
  gap: 2
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

export {
  HelperImageDefaults,
  CentredFlex,
  StyleSpaces,
  SeoSettings,
  TechStackLogotypes
}
