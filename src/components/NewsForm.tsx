import React, { useState, useEffect } from 'react'
import { supabase, News } from '../lib/supabase'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Plus, X } from 'lucide-react'

interface Props {
  editingNews?: News | null
  onSuccess: () => void
}

const NewsForm: React.FC<Props> = ({ editingNews, onSuccess }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [tag, setTag] = useState('')
  const [important, setImportant] = useState(false)
  const [images, setImages] = useState<string[]>([''])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editingNews) {
      setTitle(editingNews.title)
      setDescription(editingNews.description)
      setContent(editingNews.content)
      setTag(editingNews.tag)
      setImportant(editingNews.important)
      setImages(editingNews.images?.length ? editingNews.images : [''])
    }
  }, [editingNews])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const cleanImages = images.filter(i => i.trim() !== '')

    if (editingNews) {
      await supabase.from('news').update({
        title,
        description,
        content,
        tag,
        important,
        images: cleanImages
      }).eq('id', editingNews.id)
    } else {
      await supabase.from('news').insert({
        title,
        description,
        content,
        tag,
        important,
        images: cleanImages,
        date: new Date().toISOString().split('T')[0]
      })
    }

    setTitle('')
    setDescription('')
    setContent('')
    setTag('')
    setImportant(false)
    setImages([''])
    setLoading(false)
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Başlıq" value={title} onChange={e => setTitle(e.target.value)} />
      <Textarea placeholder="Qısa təsvir" value={description} onChange={e => setDescription(e.target.value)} />
      <Textarea placeholder="Ətraflı mətn" value={content} onChange={e => setContent(e.target.value)} />
      <Input placeholder="Kateqoriya" value={tag} onChange={e => setTag(e.target.value)} />

      <div className="space-y-2">
        <Label>Şəkil URL-ləri</Label>
        {images.map((img, i) => (
          <div key={i} className="flex gap-2">
            <Input
              placeholder="https://..."
              value={img}
              onChange={e => {
                const arr = [...images]
                arr[i] = e.target.value
                setImages(arr)
              }}
            />
            <Button type="button" variant="outline" onClick={() => setImages(images.filter((_, x) => x !== i))}>
              <X size={16} />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={() => setImages([...images, ''])}>
          <Plus size={16} /> Şəkil əlavə et
        </Button>
      </div>

      <Button disabled={loading} className="w-full">
        {editingNews ? 'Yenilə' : 'Əlavə et'}
      </Button>
    </form>
  )
}

export default NewsForm
