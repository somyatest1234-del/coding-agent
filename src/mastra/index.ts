import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";
import { PinoLogger } from "@mastra/loggers";
import { codingAgent } from "./agents/coding-agent";

// ✅ Guard against undefined env vars at build time
const CDATA_TOKEN = process.env.CDATA_API_TOKEN || "";
const ENABLE_MCP = process.env.ENABLE_MCP === "true";

export const mastra = new Mastra({
  agents: { codingAgent },

  storage: new LibSQLStore({
    url: "file:../.mastra.db",
  }),

  logger: new PinoLogger({
    name: "Mastra",
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
  }),

  observability: {
    default: { enabled: true },
  },

  // 👇 Safe MCP configuration (only loads when ENABLE_MCP=true)
  ...(ENABLE_MCP && {
    mcp: {
      enabled: true,
      servers: [
        {
          name: "CData Managed",
          type: "http",
          url: "https://mcp.cloud.cdata.com/mcp", // ✅ your real endpoint
          auth: {
            type: "bearer",
            token: CDATA_TOKEN,
          },
        },
      ],
    },
  }),
});

// ✅ Debug log to verify env loading
console.log("✅ Mastra MCP config:", {
  ENABLE_MCP,
  tokenLoaded: !!CDATA_TOKEN,
});
