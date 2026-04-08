import  {startLogger} from "@/lib/logger";
import { pinoHttp } from "pino-http";

const logger = startLogger()
export const httpLogger = pinoHttp({
  logger,
  serializers: {
    req(req) {
      return {
        method: req.method,
        url: req.url,
      };
    },
    res(res) {
      return {
        statusCode: res.statusCode,
      };
    },
  },
});