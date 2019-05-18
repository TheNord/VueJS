module.exports = {
  devServer: {
    proxy: {
      // при обращении к адресу /api переносить все запросы на порт 3001
      '^/api': {
          target: 'http://localhost:3001',
          ws: true,
          secure: false
      }
    }
  }
}
