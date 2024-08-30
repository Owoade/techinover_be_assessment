import { REDIS_URL } from "@env/index";
import { Redis } from "ioredis";

export const redis_client = REDIS_URL ? new Redis( REDIS_URL, { tls: {} } ) : new Redis();
