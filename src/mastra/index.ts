import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";
import { PinoLogger } from "@mastra/loggers";
import { codingAgent } from "./agents/coding-agent";

const ENABLE_MCP = process.env.ENABLE_MCP === "true";
const CDATA_TOKEN = process.env.CDATA_API_TOKEN;

export const mastra = new Mastra({
  agents: { codingAgent },
  storage: new LibSQLStore({ url: "file:../.mastra.db" }),
  logger: new PinoLogger({
    name: "Mastra",
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
  }),
  observability: { default: { enabled: true } },

  // ✅ MCP configuration block — REQUIRED
  ...(ENABLE_MCP && {
    mcp: {
      enabled: true,
      servers: [
        {
          name: "CData Managed MCP",
          type: "http",
          url: "https://mcp.cloud.cdata.com/mcp", // 👈 Your confirmed URL
          auth: {
            type: "bearer",
            token: CDATA_TOKEN,
          },
        },
      ],
    },
  }),
});

// ✅ Helpful for debugging in Logs
console.log("✅ Mastra MCP setup:", {
  ENABLE_MCP,
  tokenLoaded: !!CDATA_TOKEN,
});
