import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASEURL || 'http://localhost:8080'
const supabaseKey = import.meta.env.VITE_SUPABASEKEY || ''
const supabaseStorage = import.meta.env.VITE_SUPABASESTORAGE || ''

const supabase = createClient(supabaseUrl, supabaseKey)

export const uploadImage = async (file: File) => {
  const { data, error } = await supabase.storage.from(supabaseStorage).upload(
    `public/${file.name
      .split('.')
      .splice(0, file.name.split('.').length - 1)
      .join('')}${new Date().getTime()}${file.name.split('.')[file.name.split('.').length - 1]}`,
    file,
    {
      cacheControl: '3600',
      upsert: false
    }
  )
  if (error) {
    throw error
  }
  console.log(data)
  return data.path
}

export const getImages = async (filename: string) => {
  const { data, error } = await supabase.storage.from(supabaseStorage).download(`public/${filename}`)
  if (error) {
    throw error
  }
  return URL.createObjectURL(data)
}
export const deleteImage = async (filename: string) => {
  const { data, error } = await supabase.storage.from(supabaseStorage).remove([`public/${filename}`])
  if (error) {
    throw error
  }
  return data
}
