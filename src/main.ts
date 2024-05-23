import { createSSRApp } from 'vue'
import API from './api'
import App from './App.vue'

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp() {
  const app = createSSRApp(App)

  const api = new API()
  app.provide('api', api)

  return { app }
}
