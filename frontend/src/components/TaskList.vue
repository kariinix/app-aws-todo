<template>
  <div class="task-list">
    <h2>📋 Your Tasks</h2>
    <ul>
      <li v-for="task in tasks" :key="task.taskId" :class="{ done: task.completed }">
        <span>{{ task.title }}</span>
        <div class="buttons">
          <button class="toggle-btn" @click="toggle(task)">
            {{ task.completed ? 'Undo' : 'Done' }}
          </button>
          <button class="delete-btn" @click="remove(task)">✕</button>
        </div>
      </li>
    </ul>
    <div class="add-task">
      <input v-model="newTask" placeholder="New task" @keyup.enter="add" />
      <button class="add-btn" @click="add">Add</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Task {
  taskId: string
  title: string
  completed: boolean
  createdAt: string
}

const apiBase = "https://vvlfs6eugb.execute-api.eu-north-1.amazonaws.com/dev"
const tasks = ref<Task[]>([])
const newTask = ref('')
const userId = localStorage.getItem('userId') || ''

const fetchTasks = async () => {
  if (!userId) return
  try {
    const res = await axios.get(`${apiBase}/getUserTasks`, { params: { userId } })
    tasks.value = res.data
  } catch (err) {
    console.error('❌ Failed to fetch tasks:', err)
  }
}

const add = async () => {
  if (!newTask.value.trim() || !userId) return
  try {
    await axios.post(`${apiBase}/addTask`, { userId, title: newTask.value })
    newTask.value = ''
    fetchTasks()
  } catch (err) {
    console.error('❌ Failed to add task:', err)
  }
}

const toggle = async (task: Task) => {
  if (!userId) return
  await axios.put(`${apiBase}/updateTask`, {
    userId,
    taskId: task.taskId,
    completed: !task.completed,
  })
  fetchTasks()
}

const remove = async (task: Task) => {
  if (!userId) return
  await axios.post(`${apiBase}/deleteTask`, {
    userId,
    taskId: task.taskId,
  })
  fetchTasks()
}

onMounted(fetchTasks)
</script>

<style scoped>
.task-list {
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

h2 {
  text-align: center;
  margin-bottom: 24px;
  color: #1e3a8a;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e5e7eb;
}

li.done span {
  text-decoration: line-through;
  color: #9ca3af;
}

.buttons {
  display: flex;
  gap: 8px;
}

.toggle-btn {
  background: #34d399;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;
}

.delete-btn {
  background: #f87171;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;
}

.add-task {
  display: flex;
  margin-top: 24px;
}

input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
}

.add-btn {
  margin-left: 8px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
}
.add-btn:hover {
  background: #2563eb;
}
</style>
