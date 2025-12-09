import React, { useState } from 'react'
import { supabase, type News } from '../lib/supabase'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Alert, AlertDescription } from './ui/alert'
import { Checkbox } from './ui/checkbox'
import { X, Plus } from 'lucide-react'

interface NewsFormProps {
  onNewsAdded?: () => void
}

const NewsForm: React.FC<NewsFormProps> = ({ onNewsAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    tag: '',
    important: false,
    author: 'Admin',
    date: new Date().toISOString().split('T')[0]
  })
  const [images, setImages] = useState<string[]>([''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images]
    newImages[index] = value
    setImages(newImages)
  }

  const addImageField = () => {
    setImages([...images, ''])
  }

  const removeImageField = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    setImages(newImages.length ? newImages : [''])
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      tag: '',
      important: false,
      author: 'Admin',
      date: new Date().toISOString().split('T')[0]
    })
    setImages([''])
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (!formData.title.trim() || !formData.description.trim() || !formData.content.trim()) {
        throw new Error('Bütün məcburi sahələri doldurun')
      }

      const filteredImages = images.filter(img => img.trim())

      const { error } = await supabase
        .from('news')
        .insert([{
          ...formData,
          images: filteredImages.length ? filteredImages : null
        }])

      if (error) {
        throw error
      }

      setSuccess('Xəbər uğurla əlavə edildi!')
      resetForm()
      
      if (onNewsAdded) {
        onNewsAdded()
      }

    } catch (err: any) {
      setError(err.message || 'Xəbər əlavə edilərkən xəta baş verdi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Yeni Xəbər Əlavə Et</CardTitle>
        <CardDescription>
          Xəbər məlumatlarını doldurun
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">
                {success}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Xəbər başlığı *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Xəbər başlığı"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Qısa təsvir *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Kart üçün qısa təsvir..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Ətraflı məzmun *</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Ətraflı məzmun..."
              rows={6}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tag">Kateqoriya *</Label>
              <Input
                id="tag"
                name="tag"
                                value={formData.tag}
                onChange={handleInputChange}
                placeholder="Məsələn: Kurslar, Tədbirlər"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Tarix *</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Şəkillər (URL)</Label>
            {images.map((image, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  type="url"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder="Şəkil URL-i"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeImageField(index)}
                  disabled={images.length === 1}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addImageField}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Şəkil əlavə et
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Müəllif</Label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Müəllif adı"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="important"
              checked={formData.important}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, important: checked as boolean }))
              }
            />
            <Label htmlFor="important">Vacib xəbər (önə çıxar)</Label>
          </div>

          <div className="flex gap-2">
            <Button 
              type="submit" 
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Əlavə edilir...' : 'Xəbər əlavə et'}
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={resetForm}
              disabled={loading}
            >
              Təmizlə
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default NewsForm