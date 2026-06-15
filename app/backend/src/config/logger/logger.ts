import pino from 'pino'

const service = 'superstore-api'
export const startLogger = () => {
  const env = process.env.NODE_ENV ?? 'development'
  
  if(env==="test-e2e"){
    return pino({level:"info"})
  }
  if (env === 'test') {
    return pino({ level: 'debug' })
  }
  return pino(
    {
      level: "info",
      base: {
        service
      },
      timestamp: pino.stdTimeFunctions.isoTime,
     
    },
    
  )
}