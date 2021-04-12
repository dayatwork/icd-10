import dotenv from "dotenv";
import csv from "csv-parser";
import Redis from "ioredis";

import fs from "fs";

dotenv.config();

const r = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  family: 4, // 4 (IPv4) or 6 (IPv6)
  password: process.env.REDIS_PASSWORD,
});
const p = r.pipeline();

fs.createReadStream("./ICD-10.csv")
  .pipe(csv())
  .on("data", (data) => {
    let key = `icd-10:${data.code}`;
    p.hset(key, "code", data.code, "name", data.name);
  })
  .on("end", () => {
    p.exec();
    r.quit();
  });
