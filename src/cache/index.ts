import { REDIS_SSL_MODE, REDIS_URL } from "@env/index";
import { Redis } from "ioredis";

export const redis_client = new Redis(REDIS_URL, {
    ...( REDIS_SSL_MODE === "on" ? { tls: {} } : {})
})

// export const redis_client = {} as Redis