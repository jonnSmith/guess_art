import { Spinner } from '@chakra-ui/react'
import Link from 'next/link'
import type { FC } from 'react'

import { UIStrings } from '~/lib/i18n/resources'

const ScoresPlaceholder: FC<{ length?: number }> = props => {
  const { length } = props
  if (length === undefined) {
    return <Spinner />
  }
  return (
    <Link type="button" href="/">
      {UIStrings.noUsersLink}
    </Link>
  )
}

export { ScoresPlaceholder }
