import { Mastra } from "@mastra/core/mastra";
import { dataAgent } from "./agents/data-agent";
import mcpJson from "./mcp-config.json";

export const mastra = new Mastra({
  agents: { dataAgent },

  // turn OFF observability to stop @mastra-loggers-* from being pulled in
  observability: { default: { enabled: false } },

  // JSON MCP config + runtime token injection
  mcp: {
    ...mcpJson,
    servers: mcpJson.servers.map((s) => ({
      ...s,
      auth: { ...s.auth, token: process.env.CDATA_API_TOKEN || "" },
    })),
  },
});
