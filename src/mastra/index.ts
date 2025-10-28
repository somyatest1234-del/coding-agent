import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";
import { dataAgent } from "../agents/data-agent";
import mcpJson from "./mcp-config.json"; // keep JSON, see tsconfig change

export const mastra = new Mastra({
  agents: { dataAgent },

  storage: new LibSQLStore({ url: "file:../.mastra.db" }),

  // lightweight, static-safe logger
  logger: {
    name: "Mastra",
    info: (...a: any[]) => console.log("[INFO]", ...a),
    error: (...a: any[]) => console.error("[ERROR]", ...a),
    debug: (...a: any[]) => console.debug("[DEBUG]", ...a),
  },

  observability: { default: { enabled: true } },

  // JSON config + runtime token injection
  mcp: {
    ...mcpJson,
    servers: mcpJson.servers.map((s) => ({
      ...s,
      auth: { ...s.auth, token: process.env.CDATA_API_TOKEN || "" },
    })),
  },
});

// quick diagnostics in deployment logs
console.log("✅ Mastra MCP config:", {
  tokenLoaded: !!process.env.CDATA_API_TOKEN,
});
