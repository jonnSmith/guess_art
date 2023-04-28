import { skipWorldsCompare } from '~/lib/settings/constants'
import { LocalStateSetup } from '~/lib/settings/enums'

class UtilsService {
  simplifyString(s: string) {
    let cleaned = `${s.toLowerCase().replace(' ', '')}`
    skipWorldsCompare.forEach(w => {
      cleaned = cleaned.replace(`${w}`, '')
    })
    return cleaned
  }

  isAlbumObvious(artist: string) {
    return (album: string) =>
      !this.simplifyString(album).match(`${this.simplifyString(artist)}`)
  }

  guessArtist(artist: string, guess: string) {
    const compare = this.simplifyString(artist).split('')
    const compared = this.simplifyString(guess).split('')
    let score: number = LocalStateSetup.maxScore
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const i in compare) {
      if (!score) {
        return score
      }
      if (compared[i] !== compare[i]) {
        score -= LocalStateSetup.missCharValue
      }
    }
    return score
  }
}

const Utils = new UtilsService()
export { Utils }
