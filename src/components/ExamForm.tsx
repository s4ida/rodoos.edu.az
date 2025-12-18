import React, { useEffect, useState } from 'react'
import { supabase, type Exam } from '../lib/supabase'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Alert, AlertDescription } from './ui/alert'

interface ExamFormProps {
  editingExam?: Exam | null
  onSuccess?: () => void
}

const emptyForm = {
  title: '',
  description: '',
  date: new Date().toISOString().split('T')[0]
}

const ExamForm: React.FC<ExamFormProps> = ({ editingExam, onSuccess }) => {
  const [formData, setFormData] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  /* ---------------- EDIT MODE ---------------- */
  useEffect(() => {
    if (editingExam) {
      setFormData({
        title: editingExam.title,
        description: editingExam.description,
        date: editingExam.date
      })
    } else {
      setFormData(emptyForm)
    }
  }, [editingExam])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(p => ({ ...p, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const query = editingExam
      ? supabase
          .from('exams')
          .update(formData)
          .eq('id', editingExam.id)
      : supabase
          .from('exams')
          .insert([formData])

    const { error } = await query

    if (error) {
      setError(error.message)
    } else {
      onSuccess?.()
      setFormData(emptyForm)
    }

    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {editingExam ? 'İmtahanı redaktə et' : 'Yeni imtahan'}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div>
            <Label>İmtahan adı</Label>
            <Input name="title" value={formData.title} onChange={handleChange} />
          </div>

          <div>
            <Label>Təsvir</Label>
            <Textarea name="description" value={formData.description} onChange={handleChange} />
          </div>

          <div>
            <Label>Tarix</Label>
            <Input type="date" name="date" value={formData.date} onChange={handleChange} />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading
              ? 'Yüklənir...'
              : editingExam
              ? 'Yadda saxla'
              : 'Əlavə et'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ExamForm
