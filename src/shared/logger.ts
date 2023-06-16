import path from 'path'
import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, printf } = format
import DailyRotateFile from 'winston-daily-rotate-file'
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${date.toDateString()} ${hour}:${minute}:${second} [${label}] ${level}: ${message}`
})

export const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'uw-success' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'success',
        'uw-%DATE%.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export const errorLogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'university website' }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'error',
        'uw-%DATE%.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})
