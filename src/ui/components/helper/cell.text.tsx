import { Tooltip, Text } from '@chakra-ui/react'
import type { FC } from 'react'

import { Utils } from '~/lib/services/utils'
import { StyleCellText } from '~/ui/settings/constants'

const CellText: FC<{ text: string }> = props => {
  const { text } = props
  return Utils.hasTextOverlay(text) ? (
    <Text style={StyleCellText}>{text}</Text>
  ) : (
    <Tooltip label={text} hasArrow aria-label={text} placement="auto-end">
      <Text style={StyleCellText}>{text}</Text>
    </Tooltip>
  )
}

export { CellText }
