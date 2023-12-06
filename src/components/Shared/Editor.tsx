import dynamic from 'next/dynamic'
import ImageUploader from 'quill-image-uploader'
// import ReactQuill, { Quill } from 'react-quill'
// import { toast } from "react-toastify";
// import ImageServices from "~/services/imageServices";
const ReactQuill = dynamic(async () => await import('react-quill'), {
  ssr: false,
})
// Quill.register('modules/imageUploader', ImageUploader)

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['blockquote', 'code-block'],
      ['image', 'link'],
      ['clean'],
    ],
  },
  // imageUploader: {
  //   upload: (file: File) => {
  //     return new Promise((resolve, reject) => {
  //       const formData = new FormData()
  //       formData.append('file', file)
  //       ImageServices.postImage(formData)
  //         .then((response) => {
  //           resolve(response.data.filePath)
  //         })
  //         .catch((error) => {
  //           toast.error('Tải ảnh thất bại')
  //         })
  //     })
  //   },
  // },
  clipboard: {
    matchVisual: false,
  },
}

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'script',
  'image',
  'align',
  'direction',
  'code-block',
]

interface EditorProps {
  value: string
  onChange: (value: string) => void
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  return (
    <ReactQuill
      modules={modules}
      placeholder="Nhập nội dung tại đây ..."
      value={value}
      onChange={(value: string) => {
        onChange(value)
      }}
      formats={formats}
      theme="snow"
    />
  )
}

export default Editor
