import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";
import { codingAgent } from "./agents/coding-agent";

const ENABLE_MCP = process.env.ENABLE_MCP === "true";
const CDATA_TOKEN = process.env.CDATA_API_TOKEN || "";

export const mastra = new Mastra({
  agents: { codingAgent },

  storage: new LibSQLStore({
    url: "file:../.mastra.db",
  }),

  // ✅ Replace dynamic PinoLogger with static-safe inline logger
  logger: {
    name: "Mastra",
    info: (...args: any[]) => console.log("[INFO]", ...args),
    error: (...args: any[]) => console.error("[ERROR]", ...args),
    debug: (...args: any[]) => console.debug("[DEBUG]", ...args),
  },

  observability: {
    default: {
      enabled: true,
    },
  },

  // ✅ Conditional MCP setup — runtime safe
  ...(ENABLE_MCP && {
    mcp: {
      enabled: true,
      servers: [
        {
          name: "CData Managed",
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

// ✅ Add diagnostic log
console.log("✅ Mastra MCP setup:", {
  ENABLE_MCP,
  tokenLoaded: !!CDATA_TOKEN,
});
