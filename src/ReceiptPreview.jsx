import { useRef, useState } from 'react'
import { toBlob } from 'html-to-image'
import Receipt from './Receipt.jsx'

const buttonClasses = 'flex-1 rounded-xl bg-blue-500 px-4 py-3.5 text-base font-semibold text-white active:brightness-90 disabled:cursor-default disabled:opacity-60'

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export default function ReceiptPreview({ data }) {
  const receiptRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  async function generateBlob() {
    return toBlob(receiptRef.current, { pixelRatio: 2, backgroundColor: '#ffffff' })
  }

  async function handleShare() {
    setBusy(true)
    setMessage('')
    try {
      const blob = await generateBlob()
      const file = new File([blob], `Receipt-${data.date}.png`, { type: 'image/png' })
      const canShareFile = navigator.canShare && navigator.canShare({ files: [file] })

      if (canShareFile) {
        await navigator.share({
          files: [file],
          title: 'Receipt',
          text: `Receipt for ${data.partyName}`,
        })
      } else {
        downloadBlob(blob, file.name)
        setMessage('Sharing isn’t supported on this browser — the receipt was downloaded instead. Open it from your downloads and attach it in WhatsApp.')
      }
    } catch (error) {
      if (error?.name !== 'AbortError') {
        setMessage('Could not share the receipt. Please try downloading it instead.')
      }
    } finally {
      setBusy(false)
    }
  }

  async function handleDownload() {
    setBusy(true)
    setMessage('')
    try {
      const blob = await generateBlob()
      downloadBlob(blob, `Receipt-${data.date}.png`)
    } catch (error) {
      setMessage('Could not generate the receipt image.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-col gap-5 border-t border-neutral-200 pt-6">
      <p className="text-sm font-semibold text-neutral-700">Preview</p>

      <Receipt ref={receiptRef} {...data} />

      {message && (
        <p className="rounded-xl border border-neutral-300 bg-neutral-100 px-4 py-3 text-sm text-neutral-900">
          {message}
        </p>
      )}

      <div className="flex flex-row gap-3">
        <button type="button" className={buttonClasses} onClick={handleDownload} disabled={busy}>
          Download image
        </button>
        <button type="button" className={buttonClasses} onClick={handleShare} disabled={busy}>
          {busy ? 'Preparing…' : 'Share'}
        </button>
      </div>
    </div>
  )
}
