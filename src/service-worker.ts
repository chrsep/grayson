// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { build, timestamp } from "$service-worker"

const ASSETS = `cache${timestamp}`

const cached = new Set(build)

self.addEventListener("install", (event: any) => {
  event.waitUntil(
    caches
      .open(ASSETS)
      .then((cache) => cache.addAll(build))
      .then(() => {
        self.skipWaiting()
      })
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(async (keys) => {
      for (const key of keys) {
        if (key !== ASSETS) await caches.delete(key)
      }

      self.clients.claim()
    })
  )
})

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return

  const url = new URL(event.request.url)

  // don't try to handle e.g. data: URIs
  if (!url.protocol.startsWith("http")) return

  // ignore dev server requests
  if (url.hostname === self.location.hostname && url.port !== self.location.port) return

  // always serve assets and webpack-generated files from cache
  if (url.host === self.location.host && cached.has(url.pathname)) {
    event.respondWith(caches.match(event.request))
    return
  }

  // for everything else, try the network first, falling back to
  // cache if the user is offline. (If the pages never change, you
  // might prefer a cache-first approach to a network-first one.)
  event.respondWith(
    caches.open(`offline${timestamp}`).then(async (cache) => {
      try {
        if (event.request.cache === "only-if-cache") {
          // workaround Chrome devtools bug https://github.com/sveltejs/sapper-template/issues/34
          event.request.mode = "same-origin"
        }

        const response = await fetch(event.request)
        cache.put(event.request, response.clone())
        return response
      } catch (err) {
        const response = await cache.match(event.request)
        if (response) return response

        throw err
      }
    })
  )
})
