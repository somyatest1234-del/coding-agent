import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";
import { PinoLogger } from "@mastra/loggers";
import { codingAgent } from "./agents/coding-agent";

export const mastra = new Mastra({
  agents: { codingAgent },
  storage: new LibSQLStore({ url: "file:../.mastra.db" }),
  logger: new PinoLogger({
    name: "Mastra",
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
  }),
  observability: {
    default: {
      enabled: true,
    },
  },

  // 👇 Add this section for your CData Managed MCP
  mcp: {
    enabled: true,
    servers: [
      {
        name: "CData Managed",
        type: "http",
        url: "https://mcp.cloud.cdata.com/mcp", // your managed CData MCP endpoint
        auth: {
          type: "bearer",
          token: process.env.CDATA_API_TOKEN,
        },
      },
    ],
  },
});
