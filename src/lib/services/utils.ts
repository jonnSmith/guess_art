import { skipWorldsCompare } from '~/lib/settings/constants'
import { LocalStateSetup } from '~/lib/settings/enums'

class UtilsService {
  cleanString = (s: string) => `${s.toLowerCase().replace(' ', '')}`

  simplifyString(s: string) {
    let cleaned = this.cleanString(s)
    skipWorldsCompare.forEach(w => {
      cleaned = cleaned.replace(`${w}`, '')
    })
    return cleaned
  }

  isAlbumNotObvious(artist: string) {
    const artistName = `${this.simplifyString(artist)}`
    return (album: string) => {
      const isMatch = this.cleanString(album).match(artistName)
      return !isMatch?.length && !isMatch
    }
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
