import { defineStore } from 'pinia'
import type { OutputData } from '@editorjs/editorjs'
import {
  createPost,
  getPost,
  updatePost,
  publishPost,
  listPosts
} from '../services/posts'

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export interface PostSummary {
  id: string
  title: string
  slug: string
  published: boolean
}

export interface PostDetail extends PostSummary {
  blocks: OutputData | null
}

export const usePostStore = defineStore('posts', {
  state: () => ({
    current: null as PostDetail | null,
    saveStatus: 'idle' as SaveStatus,
    drafts: [] as PostSummary[],
    published: [] as PostSummary[],
    loadingList: false,
    listLoaded: false
  }),
  getters: {
    currentId: state => state.current?.id || '',
    currentTitle: state => state.current?.title || '',
    currentSlug: state => state.current?.slug || '',
    currentPublished: state => !!state.current?.published,
    currentBlocks: state => state.current?.blocks || undefined
  },
  actions: {
    async ensureCurrent() {
      if (this.current) {
        return
      }
      const created = await createPost({
        title: '',
        slug: '',
        blocks: null
      })
      this.current = created
      await this.fetchPosts()
    },
    updateTitle(title: string) {
      if (!this.current) {
        return
      }
      this.current.title = title
      this.current.slug = this.slugify(title)
      this.saveStatus = 'idle'
    },
    updateBlocks(blocks: OutputData) {
      if (!this.current) {
        return
      }
      this.current.blocks = blocks
      this.saveStatus = 'idle'
    },
    slugify(value: string) {
      return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
    },
    async loadPost(id: string) {
      const post = await getPost(id)
      this.current = post
      this.saveStatus = 'idle'
      await this.fetchPosts()
    },
    async saveCurrent() {
      if (!this.current) {
        await this.ensureCurrent()
      }
      if (!this.current) {
        return
      }
      this.saveStatus = 'saving'
      try {
        this.current = await updatePost(this.current.id, {
          title: this.current.title,
          slug: this.current.slug,
          blocks: this.current.blocks
        })
        this.saveStatus = 'saved'
        await this.fetchPosts()
      } catch {
        this.saveStatus = 'error'
      }
    },
    async togglePublish() {
      if (!this.current) {
        return
      }
      await publishPost(this.current.id)
      this.current.published = !this.current.published
      await this.fetchPosts()
    },
    async fetchPosts() {
      this.loadingList = true
      try {
        const posts = await listPosts()
        this.drafts = posts.filter(p => !p.published)
        this.published = posts.filter(p => p.published)
        this.listLoaded = true
      } finally {
        this.loadingList = false
      }
    }
  }
})

