import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";
import { codingAgent } from "./agents/coding-agent";

// ✅ Environment Guards
const CDATA_TOKEN = process.env.CDATA_API_TOKEN || "";
const ENABLE_MCP = process.env.ENABLE_MCP === "true";

export const mastra = new Mastra({
  agents: { codingAgent },

  storage: new LibSQLStore({
    url: "file:../.mastra.db",
  }),

  // ✅ Minimal inline logger (avoids 'name' undefined error)
  logger: {
    name: "Mastra",
    info: console.log,
    error: console.error,
    debug: console.debug,
  },

  observability: {
    default: {
      enabled: true,
    },
  },

  // ✅ Conditional MCP configuration
  ...(ENABLE_MCP && {
    mcp: {
      enabled: true,
      servers: [
        {
          name: "CData Managed MCP",
          type: "http",
          url: "https://mcp.cloud.cdata.com/mcp",
          auth: {
            type: "bearer",
            token: CDATA_TOKEN,
          },
        },
      ],
    },
  }),
});

// ✅ Log MCP setup for debugging
console.log("✅ Mastra MCP setup:", {
  ENABLE_MCP,
  tokenLoaded: !!CDATA_TOKEN,
});
