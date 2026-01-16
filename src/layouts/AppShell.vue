<template>
  <div
    class="flex h-screen bg-slate-50 text-slate-900 dark:bg-black dark:text-slate-100"
  >
    <aside
      class="w-72 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col"
    >
      <div
        class="h-14 flex items-center px-4 border-b border-slate-200 dark:border-slate-800"
      >
        <span class="text-sm font-semibold tracking-tight">DraftKit</span>
      </div>
      <div class="flex-1 overflow-y-auto">
        <SidebarPosts />
      </div>
      <div
        class="p-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400"
      >
        <router-link
          to="/login"
          class="hover:text-neutral-800 dark:hover:text-neutral-200"
        >
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
