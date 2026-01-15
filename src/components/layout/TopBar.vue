<template>
  <header
    class="h-14 border-b border-border-subtle bg-surface flex items-center justify-between px-6"
  >
    <div class="flex items-center gap-3">
      <input
        v-model="title"
        type="text"
        placeholder="Untitled"
        class="text-base font-semibold bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-slate-400"
      />
      <span class="text-[11px] text-slate-400">
        {{ slugPreview }}
      </span>
    </div>
    <div class="flex items-center gap-3">
      <span
        class="text-[11px]"
        :class="{
          'text-emerald-600': status === 'saved',
          'text-slate-500': status === 'idle',
          'text-amber-600': status === 'saving',
          'text-rose-600': status === 'error'
        }"
      >
        <span v-if="status === 'saving'">Saving…</span>
        <span v-else-if="status === 'saved'">Saved</span>
        <span v-else-if="status === 'error'">Save failed</span>
        <span v-else>Idle</span>
      </span>
      <button
        type="button"
        class="inline-flex items-center rounded-full border border-slate-300 px-3 py-1 text-xs hover:bg-slate-50 active:bg-slate-100"
        @click="togglePublish"
      >
        <span v-if="isPublished">Unpublish</span>
        <span v-else>Publish</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePostStore } from '../../stores/postStore'

const postStore = usePostStore()

const title = computed({
  get: () => postStore.currentTitle,
  set: value => postStore.updateTitle(value)
})

const slugPreview = computed(() => {
  if (!postStore.currentSlug) {
    return ''
  }
  return `/articles/${postStore.currentSlug}`
})

const status = computed(() => postStore.saveStatus)
const isPublished = computed(() => postStore.currentPublished)

const togglePublish = () => {
  if (!postStore.currentId) {
    return
  }
  postStore.togglePublish()
}
</script>

