import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";
import { PinoLogger } from "@mastra/loggers";
import { codingAgent } from "./agents/coding-agent";

const ENABLE_MCP = process.env.ENABLE_MCP === "true";
const CDATA_TOKEN = process.env.CDATA_API_TOKEN || "";

export const mastra = new Mastra({
  agents: {
    // ✅ Must be an object, not a single variable
    codingAgent,
  },

  storage: new LibSQLStore({
    url: "file:../.mastra.db",
  }),

  logger: new PinoLogger({
    name: "Mastra", // ✅ required property
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
  }),

  observability: {
    default: {
      enabled: true,
    },
  },

  // ✅ Proper conditional spread for MCP
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

// ✅ Helpful debug line for logs
console.log("
