import { toast } from 'react-hot-toast'

export const showToast = (type: 'success' | 'error', content: string): void => {
  if (type === 'success') {
    toast.success(content, {
      style: {
        border: '1px solid #51cf66',
        padding: '16px',
        color: '#51cf66',
      },
      iconTheme: {
        primary: '#51cf66',
        secondary: '#FFFAEE',
      },
    })
  } else {
    toast.error(content, {
      style: {
        border: '1px solid #ff6b6b',
        padding: '16px',
        color: '#ff6b6b',
      },
      iconTheme: {
        primary: '#ff6b6b',
        secondary: '#FFFAEE',
      },
    })
  }
}
