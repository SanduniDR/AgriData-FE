import axios from 'axios'
import { API_BASE_URL } from 'src/Config'

const sendBulkMailsByProvice = async (provinceName, subject, message) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(
      `${API_BASE_URL}/communication/bulk-mail/officer/send`,
      { province: provinceName, subject: subject, message: message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response
  } catch (error) {
    console.error('Failed to fetch farm details:', error)
    return
  }
}

const sendMailToOfficer = async (subject, message, officerList) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(
      `${API_BASE_URL}/communication/mail/officer/send`,
      { receivers: officerList, subject: subject, message: message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response
  } catch (error) {
    console.error('Failed to fetch farm details:', error)
    return
  }
}

const searchMails = async (formData, page, per_page) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(
      `${API_BASE_URL}/communication/mail/search`,
      {
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        status_sent: formData.status_sent,
        sent_to: formData.sent_to,
        sent_by: formData.sent_by,
        date: formData.date,
        page: page,
        per_page: per_page,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response
  } catch (error) {
    console.error('Failed to fetch farm details:', error)
    return
  }
}

export { sendBulkMailsByProvice, sendMailToOfficer, searchMails }
