import { useMemo } from 'react'

import type { LoggerHookProps } from './logger.contracts'
import { ConsoleLogger } from './logger.service'

ConsoleLogger.development = process.env.NODE_ENV === 'development'
const useLogger = (props: LoggerHookProps) => {
  const { id, level, color } = props
  const Logger = useMemo(
    () => new ConsoleLogger([level, id, color]),
    [id, level, color]
  )
  return { Logger }
}

export { useLogger }
