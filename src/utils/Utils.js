export const exportData = (data, fileName, type) => {
  // Create a link and download the file
  const blob = new Blob([data], { type })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.click()
  window.URL.revokeObjectURL(url)
}
