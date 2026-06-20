/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin Turbopack + file-tracing to THIS folder so the dev watcher can never
  // walk up into the parent monorepo and watch sibling node_modules.
  turbopack: { root: import.meta.dirname },
  outputFileTracingRoot: import.meta.dirname,

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
