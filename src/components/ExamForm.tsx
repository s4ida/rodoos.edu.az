import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Alert, AlertDescription } from './ui/alert'

interface ExamFormProps {
  onExamAdded?: () => void
  editingExam?: any
  onEditComplete?: () => void
}

const ExamForm: React.FC<ExamFormProps> = ({ onExamAdded, editingExam, onEditComplete }) => {
  const [formData, setFormData] = useState({
    title: editingExam?.title || '',
    description: editingExam?.description || '',
    date: editingExam?.date || new Date().toISOString().split('T')[0]
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

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    })
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (!formData.title.trim() || !formData.description.trim() || !formData.date) {
        throw new Error('Bütün sahələri doldurun')
      }

      const examData = {
        title: formData.title,
        description: formData.description,
        date: formData.date
      }

      if (editingExam) {
        // Düzəliş rejimi
        const { error } = await supabase
          .from('exams')
          .update(examData)
          .eq('id', editingExam.id)

        if (error) throw error
        setSuccess('İmtahan uğurla yeniləndi!')
        if (onEditComplete) onEditComplete()
      } else {
        // Yeni imtahan əlavə etmə
        const { error } = await supabase
          .from('exams')
          .insert([examData])

        if (error) throw error
        setSuccess('İmtahan uğurla əlavə edildi!')
        resetForm()
      }
      
      if (onExamAdded) {
        onExamAdded()
      }

    } catch (err: any) {
      setError(err.message || 'Xəta baş verdi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {editingExam ? 'İmtahanı Düzəliş Et' : 'Yeni İmtahan Əlavə Et'}
        </CardTitle>
        <CardDescription>
          {editingExam ? 'İmtahan məlumatlarını düzəliş edin' : 'İmtahan məlumatlarını doldurun'}
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
              value={formData.title}
              onChange={handleInputChange}
              placeholder="İmtahan adını daxil edin"
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
              {loading ? 
                (editingExam ? 'Yenilənir...' : 'Əlavə edilir...') : 
                (editingExam ? 'Yenilə' : 'İmtahan əlavə et')
              }
            </Button>
            
            <Button 
              type="button" 
              onClick={editingExam ? onEditComplete : resetForm}
              variant="outline"
              className="flex-1"
            >
              {editingExam ? 'Ləğv et' : 'Formu təmizlə'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default ExamForm