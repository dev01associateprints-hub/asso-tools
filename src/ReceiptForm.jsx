import { useState } from 'react'
import ReceiptPreview from './ReceiptPreview.jsx'
import './ReceiptForm.css'

const COMPANIES = ['Associate Prints', 'Associate Colour Galaxy']
const PAYMENT_METHODS = ['Cash', 'Cheque', 'RTGS', 'NEFT', 'Google Pay', 'UPI']

function todayISO() {
  const now = new Date()
  const offset = now.getTimezoneOffset()
  return new Date(now.getTime() - offset * 60000).toISOString().slice(0, 10)
}

export default function ReceiptForm() {
  const [company, setCompany] = useState('')
  const [partyName, setPartyName] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(todayISO())
  const [receivedBy, setReceivedBy] = useState('')
  const [chequeNumber, setChequeNumber] = useState('')
  const [chequeDate, setChequeDate] = useState('')
  const [chequeBank, setChequeBank] = useState('')
  const [receiptData, setReceiptData] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()
    setReceiptData({
      company,
      partyName,
      amount,
      date,
      receivedBy,
      chequeNumber,
      chequeDate,
      chequeBank,
    })
  }

  if (receiptData) {
    return <ReceiptPreview data={receiptData} onEdit={() => setReceiptData(null)} />
  }

  return (
    <form className="receipt-form" onSubmit={handleSubmit}>
      <h1 className="receipt-form-title">Receipt Details</h1>

      <fieldset className="field">
        <legend className="field-label">Company</legend>
        <div className="radio-group">
          {COMPANIES.map((name) => (
            <label key={name} className="radio-option">
              <input
                type="radio"
                name="company"
                value={name}
                checked={company === name}
                onChange={() => setCompany(name)}
                required
              />
              <span>{name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label className="field-label" htmlFor="partyName">Party name</label>
        <textarea
          id="partyName"
          className="field-input"
          rows={2}
          value={partyName}
          onChange={(event) => setPartyName(event.target.value)}
          required
        />
      </div>

      <div className="field">
        <label className="field-label" htmlFor="amount">Amount</label>
        <input
          id="amount"
          className="field-input"
          type="number"
          inputMode="decimal"
          min="0"
          step="0.01"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          required
        />
      </div>

      <div className="field">
        <label className="field-label" htmlFor="date">Date</label>
        <input
          id="date"
          className="field-input"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />
      </div>

      <fieldset className="field">
        <legend className="field-label">Received by</legend>
        <div className="radio-group">
          {PAYMENT_METHODS.map((method) => (
            <label key={method} className="radio-option">
              <input
                type="radio"
                name="receivedBy"
                value={method}
                checked={receivedBy === method}
                onChange={() => setReceivedBy(method)}
                required
              />
              <span>{method}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {receivedBy === 'Cheque' && (
        <>
          <div className="field">
            <label className="field-label" htmlFor="chequeNumber">Cheque number</label>
            <input
              id="chequeNumber"
              className="field-input"
              type="text"
              value={chequeNumber}
              onChange={(event) => setChequeNumber(event.target.value)}
              required
            />
          </div>

          <div className="field">
            <label className="field-label" htmlFor="chequeDate">Cheque date</label>
            <input
              id="chequeDate"
              className="field-input"
              type="date"
              value={chequeDate}
              onChange={(event) => setChequeDate(event.target.value)}
              required
            />
          </div>

          <div className="field">
            <label className="field-label" htmlFor="chequeBank">Cheque Bank</label>
            <input
              id="chequeBank"
              className="field-input"
              type="text"
              value={chequeBank}
              onChange={(event) => setChequeBank(event.target.value)}
              required
            />
          </div>
        </>
      )}

      <button className="submit-button" type="submit">Generate</button>
    </form>
  )
}
