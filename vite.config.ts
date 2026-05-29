import { defineConfig, type Plugin, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
import fs from "node:fs/promises"
import type { IncomingMessage, ServerResponse } from "node:http"

const devEditsPath = path.resolve(__dirname, "public/dev-edits.json")

function devEditsPlugin(): Plugin {
  return {
    name: "dev-edits-writer",
    configureServer(server: ViteDevServer) {
      server.middlewares.use("/__dev-edits", async (req: IncomingMessage, res: ServerResponse) => {
        if (req.method !== "POST") {
          res.statusCode = 405
          res.end("Method not allowed")
          return
        }

        let body = ""
        req.on("data", (chunk: Buffer) => {
          body += chunk
        })
        req.on("end", async () => {
          try {
            const parsed = JSON.parse(body)
            const payload = {
              textOverrides: parsed.textOverrides ?? {},
              deletedIds: Array.isArray(parsed.deletedIds) ? parsed.deletedIds : [],
            }

            await fs.writeFile(devEditsPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8")
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({ ok: true }))
          } catch (error) {
            server.config.logger.error(String(error))
            res.statusCode = 400
            res.end("Could not save dev edits")
          }
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [devEditsPlugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
