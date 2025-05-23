export default {
    root: 'client',
    server: {
        open: '/index.html',
        port: 6279,
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    build: {
        outDir: '../dist'
    }
}