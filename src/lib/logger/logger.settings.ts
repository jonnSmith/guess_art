enum LoggerColors {
  orange = 'orange',
  blue = 'blue',
  red = 'red',
  green = 'green',
  darkgreen = 'darkgreen',
  lightgreen = 'lightgreen',
  black = 'black',
  gray = 'gray'
}

enum LogLevel {
  none,
  error,
  warning,
  log,
  debug,
  table
}

enum LevelKeys {
  none = 'none',
  error = 'error',
  warning = 'warning',
  log = 'log',
  debug = 'debug',
  table = 'table'
}

export { LoggerColors, LevelKeys, LogLevel }
