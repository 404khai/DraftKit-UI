<template>
  <div class="flex items-center justify-center h-screen bg-surface-muted">
    <div class="w-full max-w-sm bg-surface border border-border-subtle rounded-xl shadow-sm p-6">
      <h1 class="text-lg font-semibold mb-1">Sign in</h1>
      <p class="text-sm text-slate-500 mb-4">
        Sign in to manage DraftKit content.
      </p>
      <form class="space-y-3" @submit.prevent="onSubmit">
        <div class="space-y-1">
          <label class="block text-xs font-medium text-slate-600">
            Email
          </label>
          <input
            v-model="email"
            type="email"
            class="w-full border border-border-subtle rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-400"
          />
        </div>
        <div class="space-y-1">
          <label class="block text-xs font-medium text-slate-600">
            Password
          </label>
          <input
            v-model="password"
            type="password"
            class="w-full border border-border-subtle rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-400"
          />
        </div>
        <button
          type="submit"
          class="w-full inline-flex items-center justify-center rounded-md bg-slate-900 text-slate-50 text-sm font-medium py-2.5 hover:bg-slate-800 active:bg-slate-900/90 disabled:opacity-60"
          :disabled="submitting"
        >
          <span v-if="submitting">Signing in…</span>
          <span v-else>Sign in</span>
        </button>
        <p v-if="error" class="text-xs text-rose-600 mt-1">
          {{ error }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const email = ref('')
const password = ref('')
const submitting = ref(false)
const error = ref('')

const router = useRouter()
const authStore = useAuthStore()

const onSubmit = async () => {
  submitting.value = true
  error.value = ''
  try {
    await authStore.login(email.value, password.value)
    router.push('/dashboard')
  } catch (e) {
    error.value = 'Invalid credentials'
  } finally {
    submitting.value = false
  }
}
</script>

