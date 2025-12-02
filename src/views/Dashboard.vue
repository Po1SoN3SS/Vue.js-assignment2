<template>
  <div class="app">
    <h1>🎓 Student Dashboard</h1>
    <button class="add-button" @click="toggleForm">
      {{ showForm ? "Close" : "Add Student" }}
    </button>
    <transition name="fade">
      <AddStudentForm
        v-if="showForm"
        @add-student="addStudent"
      />
    </transition>

    <div class="filter-buttons">
      <router-link to="/" class="filter-btn" :class="{ active: $route.meta.filter === 'all' }">
        All
      </router-link>
      <router-link to="/under-21" class="filter-btn" :class="{ active: $route.meta.filter === 'under21' }">
        Under 21
      </router-link>
      <router-link to="/over-21" class="filter-btn" :class="{ active: $route.meta.filter === 'over21' }">
        Over 21
      </router-link>
    </div>

    <StudentList
      :students="filteredStudents"
      @remove-student="removeStudent"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import StudentList from '../components/StudentList.vue'
import AddStudentForm from '../components/AddStudentForm.vue'

const route = useRoute()

const students = ref([
  { id: 1, name: 'Alice Johnson', age: 21 },
  { id: 2, name: 'Michael Smith', age: 22 },
])

const showForm = ref(false)

const toggleForm = () => (showForm.value = !showForm.value)

const addStudent = (student) => {
  students.value.push({ id: Date.now(), ...student })
  showForm.value = false
}

const removeStudent = (id) => {
  students.value = students.value.filter((s) => s.id !== id)
}

const filteredStudents = computed(() => {
  const filter = route.meta.filter
  
  if (filter === 'under21') {
    return students.value.filter(s => s.age < 21)
  } else if (filter === 'over21') {
    return students.value.filter(s => s.age >= 21)
  }
  
  return students.value
})
</script>

<style scoped>
.app {
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
  font-family: 'Inter', sans-serif;
  background: #f9f9fb;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.add-button {
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
  transition: 0.3s;
}
.add-button:hover {
  background: #3730a3;
}

.filter-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
}

.filter-btn {
  background: #e5e7eb;
  color: #374151;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.filter-btn:hover {
  background: #d1d5db;
}

.filter-btn.active {
  background: #4f46e5;
  color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
