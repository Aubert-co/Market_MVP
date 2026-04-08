import pino from 'pino'

export const startLogger = () => {
  const env = process.env.NODE_ENV ?? 'development'


  if (env === 'test') {
    return pino({ level: 'debug' })
  }

  const {
    LOKI_URL,
    LOKI_USERNAME,
    LOKI_PASSWORD
  } = process.env

  if (!LOKI_URL || !LOKI_USERNAME || !LOKI_PASSWORD) {
    throw new Error('Missing Loki environment variables')
  }

  const transport = pino.transport({
    target: 'pino-loki',
    options: {
      host: LOKI_URL,
      basicAuth: {
        username: LOKI_USERNAME,
        password: LOKI_PASSWORD
      },
      labels: {
        service: 'api',
        env
      },
      batching: true
    }
  })

  return pino(
    {
      level: env === 'production' ? 'info' : 'debug',
      base: {
        service: 'api'
      },
      timestamp: pino.stdTimeFunctions.isoTime
    },
    transport
  )
}