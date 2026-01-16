<template>
  <div class="flex flex-col h-full">
    <div class="px-3 pt-3 pb-2">
      <router-link
        to="/new"
        class="inline-flex items-center gap-2 rounded-full bg-black text-white text-xs px-3 py-1.5 hover:bg-slate-900 active:bg-black dark:bg-white dark:text-black dark:hover:bg-slate-100"
      >
        <i class="bi bi-plus-lg text-[12px]" />
        <span>New draft</span>
      </router-link>
    </div>
    <div class="px-3 pb-2">
      <p
        class="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1.5"
      >
        Drafts
      </p>
    </div>
    <div class="flex-1 overflow-y-auto space-y-1 px-1">
      <button
        v-for="post in drafts"
        :key="post.id"
        type="button"
        class="w-full text-left px-3 py-2 rounded-md text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex flex-col gap-0.5"
        @click="goToPost(post.id)"
      >
        <span class="font-medium truncate">{{ post.title || 'Untitled' }}</span>
        <span class="text-[11px] text-slate-500 dark:text-slate-400 truncate">
          {{ post.slug || 'No slug yet' }}
        </span>
      </button>
      <p
        v-if="!drafts.length && !loading"
        class="text-[11px] text-slate-500 dark:text-slate-400 px-3 py-2"
      >
        No drafts yet.
      </p>
      <p
        v-if="loading"
        class="text-[11px] text-slate-500 dark:text-slate-400 px-3 py-2"
      >
        Loading drafts…
      </p>
    </div>
    <div class="px-3 py-2 border-t border-slate-200 dark:border-slate-800">
      <p
        class="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1.5"
      >
        Published
      </p>
      <div class="space-y-1 max-h-32 overflow-y-auto">
        <button
          v-for="post in published"
          :key="post.id"
          type="button"
          class="w-full text-left px-3 py-2 rounded-md text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex flex-col gap-0.5"
          @click="goToPost(post.id)"
        >
          <span class="font-medium truncate">{{ post.title || 'Untitled' }}</span>
          <span class="text-[11px] text-slate-500 dark:text-slate-400 truncate">
            {{ post.slug || 'No slug yet' }}
          </span>
        </button>
        <p
          v-if="!published.length && !loading"
          class="text-[11px] text-slate-500 dark:text-slate-400"
        >
          No published posts.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePostStore } from '../../stores/postStore'

const router = useRouter()
const postStore = usePostStore()

const drafts = computed(() => postStore.drafts)
const published = computed(() => postStore.published)
const loading = computed(() => postStore.loadingList)

const goToPost = (id: string) => {
  router.push({ name: 'editor', params: { postId: id } })
}

onMounted(() => {
  if (!postStore.listLoaded) {
    postStore.fetchPosts()
  }
})
</script>
