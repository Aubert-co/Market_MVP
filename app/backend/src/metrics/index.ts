import { Request, Response } from "express";
import client from "prom-client"


const register = new client.Registry()

client.collectDefaultMetrics({register})


export const metricsRoute = async (req:Request, res:Response) => {
  res.setHeader("Content-Type", register.contentType);
  res.send(await register.metrics());
};

export const rateLimitBlocked = new client.Counter({
  name: "rate_limit_blocked_total",
  help: "Total requests blocked by rate limit",
  labelNames: ["route", "method"]
});

export const rateLimitAllowed = new client.Counter({
  name: "rate_limit_allowed_total",
  help: "Total requests allowed by rate limit",
  labelNames: ["route", "method"]
});