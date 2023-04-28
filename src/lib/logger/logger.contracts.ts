import type { LevelKeys, LoggerColors, LogLevel } from './logger.settings'

type LevelKey = keyof typeof LevelKeys
type LogLevelID = keyof typeof LogLevel
type LoggerParams<T> = [LogLevelID, string] | [LogLevelID, string, T]
type LogVars<T> = Array<T>
type LogTimeFunction = (label: string) => void
type LogTimeMap = Map<string, LogTimeFunction>
type LoggerColor = keyof typeof LoggerColors
type LoggerConfig = [level: LevelKey, id: string, color: LoggerColor]
type LogTimeData = {
  label: string
  logFunction: LogTimeFunction
}

interface LoggerHookProps {
  id: string
  level: LevelKey
  color: LoggerColor
}

export type {
  LogVars,
  LogLevelID,
  LevelKey,
  LogTimeMap,
  LogTimeData,
  LoggerColor,
  LoggerParams,
  LoggerConfig,
  LogTimeFunction,
  LoggerHookProps
}
