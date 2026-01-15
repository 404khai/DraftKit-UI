<template>
  <div class="h-full flex flex-col">
    <div class="flex-1 px-12 py-8 overflow-y-auto">
      <div
        class="max-w-3xl mx-auto bg-surface rounded-xl border border-border-subtle shadow-sm px-10 py-8"
      >
        <div id="editorjs" class="prose max-w-none"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'
import EditorJS from '@editorjs/editorjs'
import type { OutputData } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Quote from '@editorjs/quote'
import Code from '@editorjs/code'
import ImageTool from '@editorjs/image'
import Delimiter from '@editorjs/delimiter'
import { useRoute } from 'vue-router'
import { usePostStore } from '../stores/postStore'
import { uploadImage } from '../services/media'

const route = useRoute()
const postStore = usePostStore()

let editor: EditorJS | null = null
let autosaveTimer: number | undefined

const initEditor = async () => {
  const postId = route.params.postId as string | undefined
  if (postId) {
    await postStore.loadPost(postId)
  }

  editor = new EditorJS({
    holder: 'editorjs',
    autofocus: true,
    tools: {
      header: {
        class: Header,
        config: {
          levels: [1, 2, 3],
          defaultLevel: 2
        }
      },
      list: {
        class: List,
        inlineToolbar: true
      },
      quote: {
        class: Quote,
        inlineToolbar: true
      },
      code: {
        class: Code
      },
      image: {
        class: ImageTool,
        config: {
          uploader: {
            uploadByFile: async (file: File) => {
              const url = await uploadImage(file)
              return {
                success: 1,
                file: {
                  url
                }
              }
            }
          }
        }
      },
      delimiter: Delimiter
    },
    data: postStore.currentBlocks as OutputData | undefined,
    onChange: async (api: EditorJS) => {
      const data = (await api.saver.save()) as OutputData
      postStore.updateBlocks(data)
    }
  } as any)

  startAutosave()
}

const startAutosave = () => {
  stopAutosave()
  autosaveTimer = window.setInterval(async () => {
    if (!editor) {
      return
    }
    await postStore.saveCurrent()
  }, 5000)
}

const stopAutosave = () => {
  if (autosaveTimer) {
    window.clearInterval(autosaveTimer)
    autosaveTimer = undefined
  }
}

onMounted(() => {
  initEditor()
})

onBeforeUnmount(() => {
  stopAutosave()
  if (editor) {
    editor.destroy()
    editor = null
  }
})

watch(
  () => route.params.postId,
  async newId => {
    if (!newId) {
      return
    }
    if (editor) {
      await postStore.loadPost(newId as string)
      if (postStore.currentBlocks) {
        editor.render(postStore.currentBlocks as OutputData)
      }
    }
  }
)
</script>
