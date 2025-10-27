import { Mastra } from "@mastra/core";
import { LibSQLStore } from "@mastra/libsql";
import { dataAgent } from "./agents/data-agent.js";

// Load environment variables
const CDATA_TOKEN = process.env.CDATA_API_TOKEN ?? "";
const MCP_URL = process.env.MCP_URL ?? "";
const ENABLE_MCP = process.env.ENABLE_MCP === "true";

// Configure MCP servers
const mcpServers =
  ENABLE_MCP && CDATA_TOKEN
    ? [
        {
          name: "CData MCP Server",
          type: "http",
          url: MCP_URL,
          auth: {
            type: "bearer",
            token: CDATA_TOKEN,
          },
        },
      ]
    : [];

export const mastra = new Mastra({
  agents: { dataAgent },

  storage: new LibSQLStore({
    url: "file:../.mastra.db",
  }),

  logger: {
    name: "MastraLogger",
    info: console.log,
    error: console.error,
    debug: console.debug,
  },

  observability: {
    default: { enabled: true },
  },

  ...(mcpServers.length > 0 && {
    mcp: {
      enabled: true,
      servers: mcpServers,
    },
  }),
});

// Simple startup test
(async () => {
  console.log("✅ Mastra initialized with MCP:", {
    ENABLE_MCP,
    MCP_URL,
    mcpConfigured: mcpServers.length > 0,
  });

  try {
    const res = await mastra.agents.dataAgent.querySource({
      source: "salesforce",
      query: "SELECT Name, Email FROM Contact LIMIT 5",
    });
    console.log("Salesforce data sample:", res);
  } catch (err) {
    console.error("❌ Query test failed:", err.message);
  }
})();
