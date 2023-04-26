import { Tooltip, Image } from '@chakra-ui/react'
import type { FC } from 'react'
import { useId } from 'react'

import type { HelperImageProps } from '~/ui/contracts/props'
import { HelperImageDefaults } from '~/ui/settings/constants'

const HelperRectangleImage: FC<HelperImageProps> = (
  props: HelperImageProps
) => {
  const { size, label, src } = { ...HelperImageDefaults, ...props }
  const key = useId()
  return (
    <Tooltip
      {...{ label, key }}
      hasArrow
      aria-label={label}
      placement="auto-end">
      <Image src={src} alt={label} title={label} height={size} width={size} />
    </Tooltip>
  )
}

export { HelperRectangleImage }
