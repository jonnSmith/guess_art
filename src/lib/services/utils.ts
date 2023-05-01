import type { IsActualParams } from '~/lib/contracts/types'
import { ConsoleLogger } from '~/lib/logger'
import { skipWorldsCompare } from '~/lib/settings/constants'
import { LocalStateSetup } from '~/lib/settings/enums'
import { StyleSpaces } from '~/ui/settings/constants'

class UtilsService {
  private Logger: ConsoleLogger

  constructor() {
    this.Logger = new ConsoleLogger(['debug', this.constructor.name.toString()])
  }

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

  hasTextOverlay(text: string) {
    return (
      `${text}`.length < Math.floor(StyleSpaces.cell / StyleSpaces.text + 10)
    )
  }

  isRecordActual(params: IsActualParams) {
    const { TTL, time } = params
    if (TTL === undefined || Number.isNaN(+TTL) || !time) {
      return true
    }
    const timeStoring: number = Math.ceil(
      (new Date().getTime() - new Date(time).getTime()) / 1000
    )
    this.Logger.d('Record time params:', timeStoring, time, +TTL)
    return timeStoring < +TTL
  }
}

const Utils = new UtilsService()
export { Utils }
