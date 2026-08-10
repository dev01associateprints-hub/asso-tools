import { useRef, useState } from 'react'
import { toBlob } from 'html-to-image'
import Receipt from './Receipt.jsx'
import './ReceiptPreview.css'

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export default function ReceiptPreview({ data, onEdit }) {
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
      const file = new File([blob], `receipt-${data.date}.png`, { type: 'image/png' })
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
      downloadBlob(blob, `receipt-${data.date}.png`)
    } catch (error) {
      setMessage('Could not generate the receipt image.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="receipt-preview">
      <Receipt ref={receiptRef} {...data} />

      {message && <p className="receipt-preview-message">{message}</p>}

      <div className="receipt-preview-actions">
        <button type="button" className="preview-button preview-button-primary" onClick={handleShare} disabled={busy}>
          {busy ? 'Preparing…' : 'Share'}
        </button>
        <button type="button" className="preview-button" onClick={handleDownload} disabled={busy}>
          Download image
        </button>
        <button type="button" className="preview-button preview-button-text" onClick={onEdit} disabled={busy}>
          Edit details
        </button>
      </div>
    </div>
  )
}
