'use client'
import React, { useRef, useState, useCallback } from 'react'
import { Upload, X, Link, ImageIcon, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
  hint?: string
}

export default function ImageUpload({ value, onChange, label, hint }: ImageUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'url' | 'file'>('url')
  const [dragging, setDragging] = useState(false)

  const uploadFile = useCallback(async (file: File) => {
    setUploading(true)
    setError('')
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Upload failed'); return }
      onChange(data.url)
    } catch {
      setError('Upload failed — check connection')
    } finally {
      setUploading(false)
    }
  }, [onChange])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadFile(file)
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) uploadFile(file)
  }

  return (
    <div className="space-y-2">
      {label && <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>}

      {/* Preview */}
      {value ? (
        <div className="relative w-full h-36 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 group">
          <img
            src={value}
            alt="preview"
            className="w-full h-full object-cover"
            onError={e => { (e.currentTarget as HTMLImageElement).src = '/dessie-logo.png' }}
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="px-3 py-1.5 bg-white text-xs font-semibold rounded-full text-gray-800 hover:bg-gray-100 flex items-center gap-1.5"
            >
              <Upload className="w-3 h-3" /> Change
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="px-3 py-1.5 bg-red-500 text-xs font-semibold rounded-full text-white hover:bg-red-600 flex items-center gap-1.5"
            >
              <X className="w-3 h-3" /> Remove
            </button>
          </div>
        </div>
      ) : (
        /* Drop zone */
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={`w-full h-36 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors
            ${dragging ? 'border-[#0d4a28] bg-[#0d4a28]/5' : 'border-gray-200 hover:border-[#0d4a28]/50 hover:bg-gray-50'}`}
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 text-[#0d4a28] animate-spin" />
          ) : (
            <>
              <ImageIcon className="w-8 h-8 text-gray-300" />
              <p className="text-xs text-gray-400 text-center">
                <span className="font-semibold text-[#0d4a28]">Click to upload</span> or drag & drop
              </p>
              <p className="text-[10px] text-gray-300">PNG, JPG, WEBP up to 5MB</p>
            </>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* URL / File toggle */}
      <div className="flex gap-1 border border-gray-200 rounded-md p-0.5 w-fit">
        <button
          type="button"
          onClick={() => setMode('file')}
          className={`px-2.5 py-1 text-[11px] rounded flex items-center gap-1 font-medium transition-colors
            ${mode === 'file' ? 'bg-[#0d4a28] text-white' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <Upload className="w-3 h-3" /> Upload File
        </button>
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`px-2.5 py-1 text-[11px] rounded flex items-center gap-1 font-medium transition-colors
            ${mode === 'url' ? 'bg-[#0d4a28] text-white' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <Link className="w-3 h-3" /> URL
        </button>
      </div>

      {mode === 'url' && (
        <Input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={hint || 'https://... or /public-path.png'}
          className="text-xs h-8"
        />
      )}

      {mode === 'file' && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full text-xs h-8"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <><Loader2 className="w-3 h-3 mr-1.5 animate-spin" /> Uploading...</>
          ) : (
            <><Upload className="w-3 h-3 mr-1.5" /> Choose File</>
          )}
        </Button>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
