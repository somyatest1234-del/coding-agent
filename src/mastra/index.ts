import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";
import { codingAgent } from "./agents/coding-agent";

// ✅ Environment Guards
const CDATA_TOKEN = process.env.CDATA_API_TOKEN ?? "";
const ENABLE_MCP = process.env.ENABLE_MCP === "true";

// ✅ Build MCP servers array safely
const mcpServers =
  ENABLE_MCP && CDATA_TOKEN
    ? [
        {
          name: "CData Managed MCP",
          type: "http",
          url: "https://mcp.cloud.cdata.com/mcp",
          auth: {
            type: "bearer",
            token: CDATA_TOKEN,
          },
        },
      ]
    : [];

export const mastra = new Mastra({
  agents: { codingAgent },

  storage: new LibSQLStore({
    url: "file:../.mastra.db",
  }),

  // ✅ Always define logger.name
  logger: {
    name: "MastraLogger",
    info: (...args) => console.log("[INFO]", ...args),
    error: (...args) => console.error("[ERROR]", ...args),
    debug: (...args) => console.debug("[DEBUG]", ...args),
  },

  observability: {
    default: {
      enabled: true,
    },
  },

  // ✅ Only include MCP if servers exist
  ...(mcpServers.length > 0 && {
    mcp: {
      enabled: true,
      servers: mcpServers,
    },
  }),
});

// ✅ Debug info for runtime check
console.log("✅ Mastra MCP setup:", {
  ENABLE_MCP,
  tokenLoaded: Boolean(CDATA_TOKEN),
  mcpConfigured: mcpServers.length > 0,
});
