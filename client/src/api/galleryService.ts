import { instance } from '.'

export async function addFiles(files: File[]) {
  const formData = new FormData()

  for (const file of files) {
    formData.append('files', file)
  }

  console.log(files)
  const response = await instance.post('/gallery', formData)
  return response.data
}

export async function getFiles() {
  const response = await instance.get('/gallery')
  return response
}
