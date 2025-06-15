import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  define: {
    'import.meta.env.VITE_COGNITO_HOSTED_UI': JSON.stringify(
      'https://eu-north-1lpg5os4os.auth.eu-north-1.amazoncognito.com/login?client_id=5pldnhj00tdp1gqu4jqsk0983r&response_type=code&scope=email+openid&redirect_uri=https://vvlfs6eugb.execute-api.eu-north-1.amazonaws.com/dev/callback'
    )
  },
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true
  }
})
