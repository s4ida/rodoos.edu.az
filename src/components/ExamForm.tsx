import React, { useState } from 'react'
import { supabase, type Exam } from '../lib/supabase'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Alert, AlertDescription } from './ui/alert'

interface ExamFormProps {
  onExamAdded?: () => void
}

const ExamForm: React.FC<ExamFormProps> = ({ onExamAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: ''
  })
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

  // resetForm funksiyasını burada əlavə edirik
  const resetForm = () => {
    setFormData({ title: '', description: '', date: '' })
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Form validasiyası
      if (!formData.title.trim() || !formData.description.trim() || !formData.date) {
        throw new Error('Bütün sahələri doldurun')
      }

      // Supabase-ə məlumatları göndər
      const { error } = await supabase
        .from('exams')
        .insert([{
          title: formData.title.trim(),
          description: formData.description.trim(),
          date: formData.date
        }])

      if (error) {
        throw error
      }

      // Uğurlu əlavə
      setSuccess('İmtahan uğurla əlavə edildi!')
      setFormData({ title: '', description: '', date: '' })
      
      // Parent komponente bildir
      if (onExamAdded) {
        onExamAdded()
      }

    } catch (err: any) {
      setError(err.message || 'İmtahan əlavə edilərkən xəta baş verdi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Yeni İmtahan Əlavə Et</CardTitle>
        <CardDescription>
          İmtahan məlumatlarını doldurun və əlavə edin
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
            <Label htmlFor="title">İmtahan adı *</Label>
            <Input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Məsələn: Riyaziyyat İmtahanı"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">İmtahan təsviri *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="İmtahan haqqında ətraflı məlumat..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">İmtahan tarixi *</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex gap-2">
            <Button 
              type="submit" 
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Əlavə edilir...' : 'İmtahan əlavə et'}
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

export default ExamForm