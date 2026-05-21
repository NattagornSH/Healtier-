import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), nutritionApiDevProxy(env.API_NINJAS_KEY)],
    server: {
      port: 3000,
    },
    test: {
      environment: 'jsdom',
      setupFiles: './src/test/setup.js',
      coverage: {
        reporter: ['text', 'html'],
        thresholds: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        },
      },
    },
  }
})

function nutritionApiDevProxy(apiKey) {
  return {
    name: 'nutrition-api-dev-proxy',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        if (!request.url?.startsWith('/api/nutrition')) {
          next()
          return
        }

        const requestUrl = new URL(request.url, 'http://localhost')
        const query = requestUrl.searchParams.get('query')

        if (!query || query.trim().length < 2) {
          sendJson(response, 400, {
            error: 'กรุณากรอกชื่ออาหารอย่างน้อย 2 ตัวอักษร',
          })
          return
        }

        if (!apiKey) {
          sendJson(response, 500, { error: 'ยังไม่ได้ตั้งค่า API_NINJAS_KEY' })
          return
        }

        try {
          const apiResponse = await fetch(
            `https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
            {
              headers: {
                'X-Api-Key': apiKey,
              },
            },
          )
          const data = await apiResponse.json()

          sendJson(response, apiResponse.status, data)
        } catch {
          sendJson(response, 502, {
            error: 'เชื่อมต่อบริการโภชนาการไม่ได้ กรุณาลองใหม่',
          })
        }
      })
    },
  }
}

function sendJson(response, statusCode, data) {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(data))
}
