import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

const TOKEN_KEY = 'draftkit_token'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem(TOKEN_KEY) || ''
  }),
  getters: {
    isAuthenticated: state => !!state.token
  },
  actions: {
    async login(email: string, password: string) {
      const payload = {
        email,
        password
      }
      void payload
      this.token = 'mock-token'
      localStorage.setItem(TOKEN_KEY, this.token)
    },
    logout() {
      this.token = ''
      localStorage.removeItem(TOKEN_KEY)
      const router = useRouter()
      router.push('/login')
    }
  }
})
