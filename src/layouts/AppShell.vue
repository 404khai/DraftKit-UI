<template>
  <div class="flex h-screen bg-surface-muted text-slate-900">
    <aside
      class="w-72 border-r border-border-subtle bg-surface flex flex-col"
    >
      <div class="h-14 flex items-center px-4 border-b border-border-subtle">
        <span class="text-sm font-semibold tracking-tight">DraftKit</span>
      </div>
      <div class="flex-1 overflow-y-auto">
        <SidebarPosts />
      </div>
      <div class="p-4 border-t border-border-subtle text-xs text-slate-500">
        <router-link to="/login" class="hover:text-slate-700">
          Account
        </router-link>
      </div>
    </aside>
    <main class="flex-1 flex flex-col">
      <TopBar />
      <div class="flex-1 overflow-y-auto">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import SidebarPosts from '../components/layout/SidebarPosts.vue'
import TopBar from '../components/layout/TopBar.vue'
</script>

