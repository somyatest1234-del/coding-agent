import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";
import { codingAgent } from "../agents/data-agent";
import mcpJson from "./mcp-config.json";

export const mastra = new Mastra({
  agents: { codingAgent },
  storage: new LibSQLStore({ url: "file:../.mastra.db" }),
  logger: { name: "Mastra", info: console.log, error: console.error, debug: console.debug },
  observability: { default: { enabled: true } },
  mcp: {
    ...mcpJson,
    servers: mcpJson.servers.map((s) => ({
      ...s,
      auth: { ...s.auth, token: process.env.CDATA_API_TOKEN || "" },
    })),
  },
});
