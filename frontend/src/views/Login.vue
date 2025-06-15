<template>
  <div class="login-page">Logging in...</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  const hash = window.location.hash
  if (hash.includes('sub=')) {
    const userId = hash.split('sub=')[1]
    if (userId) {
      localStorage.setItem('userId', userId)
      window.location.href = '/'
    }
  }

  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  if (code) {
    fetch(`https://vvlfs6eugb.execute-api.eu-north-1.amazonaws.com/dev/callback?code=${code}`)
  }
})

</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  font-size: 1.2rem;
  color: #2563eb;
}
</style>