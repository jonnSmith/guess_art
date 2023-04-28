import type {
  LevelKey,
  LogTimeData,
  LogTimeFunction,
  LogTimeMap,
  LogVars,
  LoggerParams
} from './logger.contracts'
import { LevelKeys, LoggerColors, LogLevel } from './logger.settings'

class ConsoleLogger {
  public static development = false

  public static timeMap: LogTimeMap

  public readonly Levels: typeof LevelKeys

  public timeLogging: LogTimeFunction | undefined

  public loglevel: number

  public module: string

  public color: string

  public guardLogLevel: (levelKey: LevelKey) => boolean

  public constructor(loggerParams: LoggerParams<string>) {
    const [level, module, color = LoggerColors.gray] = loggerParams
    this.loglevel = Number(LogLevel[level]) as number
    this.module = module
    this.color = color
    this.Levels = LevelKeys
    this.guardLogLevel = (levelKey: LevelKey): boolean =>
      Number(this.loglevel) >= Number(LogLevel[levelKey]) && this.isDevelopment
  }

  public get TimeLogMap(): LogTimeMap {
    if (!ConsoleLogger.timeMap) {
      ConsoleLogger.timeMap = new Map()
    }
    return ConsoleLogger.timeMap
  }

  public set TimeLog(timeData: LogTimeData) {
    if (!ConsoleLogger.timeMap) {
      ConsoleLogger.timeMap = new Map()
    }
    const { label, logFunction } = timeData
    ConsoleLogger.timeMap.set(label, logFunction)
  }

  public get Module(): [string, string] {
    return [
      `%c ${this.module}`,
      `color: white; background-color: ${this.color}`
    ]
  }

  public static set isDevelopment(trigger: boolean) {
    this.development = trigger
  }

  public get isDevelopment(): boolean {
    return ConsoleLogger.development
  }

  public time(label: string) {
    if (!this.guardLogLevel(this.Levels.log)) {
      return
    }
    if (this.TimeLogMap.has(label)) {
      this.timeLogging = this.TimeLogMap.get(label)
      this.TimeLogMap.delete(label)
    } else {
      this.timeLogging = console.time // eslint-disable-line no-console
      this.TimeLog = { label, logFunction: console.timeEnd } // eslint-disable-line no-console
    }
    if (!this.timeLogging) {
      return
    }
    this.timeLogging.apply(this, [label])
    this.timeLogging = undefined
  }

  public log(...vars: unknown[]) {
    if (this.guardLogLevel(this.Levels.log)) {
      console.info(this.Module[0], this.Module[1], ...vars) // eslint-disable-line no-console
    }
  }

  public warning(...vars: unknown[]) {
    if (this.guardLogLevel(this.Levels.warning)) {
      console.warn(this.Module[0], this.Module[1], ...vars) // eslint-disable-line no-console
    }
  }

  public error(...vars: unknown[]) {
    if (this.guardLogLevel(this.Levels.error)) {
      console.error(this.Module[0], this.Module[1], ...vars) // eslint-disable-line no-console
    }
  }

  public debug(...vars: unknown[]) {
    if (this.guardLogLevel(this.Levels.debug)) {
      console.debug(this.Module[0], this.Module[1], ...vars) // eslint-disable-line no-console
    }
  }

  public e(...vars: LogVars<unknown>) {
    this.error(...vars)
  }

  public l(...vars: LogVars<unknown>) {
    this.log(...vars)
  }

  public w(...vars: LogVars<unknown>) {
    this.warning(...vars)
  }

  public d(...vars: LogVars<unknown>) {
    this.debug(...vars)
  }

  public table(data: Record<string, unknown>) {
    if (!this.guardLogLevel(this.Levels.log)) {
      return
    }

    if (!data || typeof data !== 'object' || !Object.keys(data)?.length) {
      this.w('Incorrect table data', JSON.stringify(data ?? 'no data'))
      return
    }
    console.groupCollapsed(this.module) // eslint-disable-line no-console
    console.table(data, Object.keys(data)) // eslint-disable-line no-console
    console.groupEnd() // eslint-disable-line no-console
  }

  public t(data: Record<string, unknown>) {
    this.table(data)
  }
}

export { ConsoleLogger }
type Logger = typeof ConsoleLogger
export type { Logger }
