import { forwardRef } from 'react'
import logo from './assets/logo.svg'
import './Receipt.css'

function formatDate(isoDate) {
  if (!isoDate) return ''
  const [year, month, day] = isoDate.split('-')
  return `${day}/${month}/${year}`
}

function formatAmount(amount) {
  const value = parseFloat(amount)
  if (Number.isNaN(value)) return ''
  return value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const Receipt = forwardRef(function Receipt(
  { company, partyName, amount, date, receivedBy, chequeNumber, chequeDate, chequeBank },
  ref,
) {
  return (
    <div className="receipt" ref={ref}>
      <div className="receipt-header">
        <img className="receipt-logo" src={logo} alt="Associate logo" />
        <div className="receipt-company">{company}</div>
      </div>

      <div className="receipt-title-row">
        <span className="receipt-title">RECEIPT</span>
        <span className="receipt-date">{formatDate(date)}</span>
      </div>

      <div className="receipt-rows">
        <div className="receipt-row">
          <span className="receipt-row-label">Received from</span>
          <span className="receipt-row-value">{partyName}</span>
        </div>

        <div className="receipt-row">
          <span className="receipt-row-label">Amount</span>
          <span className="receipt-row-value receipt-amount">₹ {formatAmount(amount)}</span>
        </div>

        <div className="receipt-row">
          <span className="receipt-row-label">Received by</span>
          <span className="receipt-row-value">{receivedBy}</span>
        </div>

        {receivedBy === 'Cheque' && (
          <>
            <div className="receipt-row">
              <span className="receipt-row-label">Cheque number</span>
              <span className="receipt-row-value">{chequeNumber}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-row-label">Cheque date</span>
              <span className="receipt-row-value">{formatDate(chequeDate)}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-row-label">Cheque bank</span>
              <span className="receipt-row-value">{chequeBank}</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
})

export default Receipt
