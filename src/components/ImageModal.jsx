import { X } from 'lucide-react'

export default function ImageModal({ src, alt = '', onClose }) {
  if (!src) return null

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4" onClick={onClose}>
      <button
        type="button"
        className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white text-slate-700"
        onClick={onClose}
        aria-label="Close image preview"
      >
        <X size={20} />
      </button>
      <img
        src={src}
        alt={alt}
        className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  )
}
