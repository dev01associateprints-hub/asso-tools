import { useState } from 'react'
import ReceiptPreview from './ReceiptPreview.jsx'

const COMPANIES = ['Associate Prints', 'Associate Colour Galaxy']
const PAYMENT_METHODS = ['Cash', 'Cheque', 'RTGS', 'NEFT', 'Google Pay', 'UPI']

const inputClasses =
  'w-full rounded-xl border border-neutral-300 bg-neutral-100 px-4 py-3 text-base text-neutral-900 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/15'
const labelClasses = 'text-sm font-semibold text-neutral-700'
const selectChevron =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M5.5 7.5l4.5 4.5 4.5-4.5' stroke='%236b6b70' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")"

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

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 bg-white p-4 sm:rounded-2xl sm:p-8 sm:shadow-xl">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-neutral-900">Receipt Details</h1>

        <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
          <legend className="mb-3 block p-0 text-sm font-semibold text-neutral-700">Company</legend>
          <div className="flex flex-col gap-2">
            {COMPANIES.map((name) => (
              <label
                key={name}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-base text-neutral-900 ${
                  company === name ? 'border-blue-500 bg-blue-50' : 'border-neutral-300 bg-neutral-100'
                }`}
              >
                <input
                  type="radio"
                  name="company"
                  value={name}
                  checked={company === name}
                  onChange={() => setCompany(name)}
                  required
                  className="h-5 w-5 shrink-0 accent-blue-500"
                />
                <span>{name}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-col gap-2">
          <label className={labelClasses} htmlFor="partyName">Party name</label>
          <textarea
            id="partyName"
            className={`${inputClasses} min-h-[3em] resize-y`}
            rows={2}
            value={partyName}
            onChange={(event) => setPartyName(event.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClasses} htmlFor="amount">Amount</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">₹</span>
            <input
              id="amount"
              className={`${inputClasses} pl-8`}
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClasses} htmlFor="date">Date</label>
          <input
            id="date"
            className={inputClasses}
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClasses} htmlFor="receivedBy">Received by</label>
          <select
            id="receivedBy"
            className={`${inputClasses} appearance-none bg-no-repeat pr-9`}
            style={{ backgroundImage: selectChevron, backgroundPosition: 'right 14px center' }}
            value={receivedBy}
            onChange={(event) => setReceivedBy(event.target.value)}
            required
          >
            <option value="" disabled>Select payment method</option>
            {PAYMENT_METHODS.map((method) => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>

        {receivedBy === 'Cheque' && (
          <>
            <div className="flex flex-col gap-2">
              <label className={labelClasses} htmlFor="chequeNumber">Cheque number</label>
              <input
                id="chequeNumber"
                className={inputClasses}
                type="text"
                value={chequeNumber}
                onChange={(event) => setChequeNumber(event.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClasses} htmlFor="chequeDate">Cheque date</label>
              <input
                id="chequeDate"
                className={inputClasses}
                type="date"
                value={chequeDate}
                onChange={(event) => setChequeDate(event.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClasses} htmlFor="chequeBank">Cheque Bank</label>
              <input
                id="chequeBank"
                className={inputClasses}
                type="text"
                value={chequeBank}
                onChange={(event) => setChequeBank(event.target.value)}
              />
            </div>
          </>
        )}

        <button
          className="mt-2 rounded-xl bg-blue-500 px-4 py-3.5 text-base font-semibold text-white active:brightness-90"
          type="submit"
        >
          Generate
        </button>
      </form>

      {receiptData && <ReceiptPreview data={receiptData} />}
    </div>
  )
}
