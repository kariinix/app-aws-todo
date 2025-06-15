<template>
  <div class="home">
    <header class="header">
      <h1 class="title">📝 To-Do List</h1>
      <button class="logout-btn" @click="logout">Logout</button>
    </header>

    <main>
      <TaskList v-if="userId" />
      <div v-else class="auth-redirect">
        <p>Redirecting to sign up...</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import TaskList from '../components/TaskList.vue'
import { ref, onMounted } from 'vue'

const userId = ref('')

onMounted(() => {
  const hash = window.location.hash
  if (hash.includes('sub=')) {
    const id = hash.split('sub=')[1]
    if (id) {
      localStorage.setItem('userId', id)
      userId.value = id
      window.history.replaceState(null, '', '/')
      return
    }
  }

  const storedId = localStorage.getItem('userId')
  if (storedId) {
    userId.value = storedId
  } else {
    const signupUrl = `https://eu-north-1lpg5os4os.auth.eu-north-1.amazoncognito.com/signup?client_id=5pldnhj00tdp1gqu4jqsk0983r&response_type=code&scope=email+openid&redirect_uri=https://vvlfs6eugb.execute-api.eu-north-1.amazonaws.com/dev/callback`
    window.location.href = signupUrl
  }
})

const logout = () => {
  localStorage.removeItem('userId')
  const logoutUrl = `https://eu-north-1lpg5os4os.auth.eu-north-1.amazoncognito.com/signup?client_id=5pldnhj00tdp1gqu4jqsk0983r&response_type=code&scope=email+openid&redirect_uri=https://vvlfs6eugb.execute-api.eu-north-1.amazonaws.com/dev/callback`
  window.location.href = logoutUrl
}
</script>

<style scoped>
.home {
  font-family: 'Segoe UI', Arial, sans-serif;
  background-color: #f8fafc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e40af;
  color: #fff;
  padding: 16px 24px;
}

.title {
  font-size: 1.8rem;
}

.logout-btn {
  background: #ef4444;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  color: white;
  font-weight: 500;
}
.logout-btn:hover {
  background: #dc2626;
}

main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 40px 16px;
}

.auth-redirect {
  text-align: center;
  color: #6b7280;
  font-style: italic;
}
</style>
