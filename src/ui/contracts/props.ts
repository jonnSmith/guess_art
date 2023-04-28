interface HelperImageProps {
  label?: string
  size?: number
  src: string
}
interface GuessAlbumProps {
  title?: string
  onSubmit: (term: string) => void
}
interface UsernameFormProps {
  onFinish: (username: string) => void
}

export type { HelperImageProps, GuessAlbumProps, UsernameFormProps }
