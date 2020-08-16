import { ConsoleFormattedStream, createLogger, stdSerializers } from 'browser-bunyan'

export default (name) => createLogger({
  name,
  streams: [{
    level: 'debug',
    stream: new ConsoleFormattedStream(),
  }],
  serializers: stdSerializers,
  src: true,
})
