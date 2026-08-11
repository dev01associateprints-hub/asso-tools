import { forwardRef } from 'react'
import logo from './assets/logo.png'

const METHOD_STYLES = {
  Cash: 'bg-emerald-100 text-emerald-700',
  Cheque: 'bg-amber-100 text-amber-700',
  RTGS: 'bg-blue-100 text-blue-700',
  NEFT: 'bg-indigo-100 text-indigo-700',
  'Google Pay': 'bg-teal-100 text-teal-700',
  UPI: 'bg-purple-100 text-purple-700',
}

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

function FieldLabel({ icon, label }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-500">
      <span className="text-base leading-none">{icon}</span>
      <span>{label}</span>
    </div>
  )
}

const Receipt = forwardRef(function Receipt(
  { company, partyName, amount, date, receivedBy, chequeNumber, chequeDate, chequeBank },
  ref,
) {
  const hasChequeDetails = receivedBy === 'Cheque' && (chequeNumber || chequeDate || chequeBank)

  return (
    <div
      ref={ref}
      className="mx-auto w-full max-w-[420px] overflow-hidden rounded-3xl bg-white font-sans text-slate-800 shadow-2xl"
    >
      <div className="relative bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-400 px-6 pb-12 pt-6 text-white">
        <div className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-lg">
          ✓
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-lg">
            <img src={logo} alt="Associate logo" className="h-full w-full object-contain" />
          </div>
          <div>
            <div className="text-2xl font-extrabold leading-tight">{company}</div>
            <div className="mt-0.5 text-xs leading-snug text-white/80">
              4/1299-A, Rice Mill Street
              <br />
              Samipuram Colony, Sivakasi - 626123
            </div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/75">Payment Receipt</div>
          </div>
        </div>
      </div>

      <div className="relative -mt-8 px-6">
        <div className="rounded-2xl bg-white p-5 text-center shadow-lg ring-1 ring-slate-100">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Amount received</div>
          <div className="mt-1 text-3xl font-extrabold text-slate-900">
            <span className="text-violet-600">₹</span> {formatAmount(amount)}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-6 pb-6 pt-6">
        <div className="rounded-xl bg-slate-50 px-4 py-3 text-left">
          <FieldLabel icon="👤" label="Received from" />
          <div className="mt-1.5 whitespace-pre-wrap break-words text-left text-sm font-semibold text-slate-900">
            {partyName}
          </div>
        </div>

        <div className="flex items-start justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3">
          <div>
            <FieldLabel icon="📅" label="Date" />
            <div className="mt-1.5 text-sm font-semibold text-slate-900">{formatDate(date)}</div>
          </div>
          <div className="text-right">
            <FieldLabel icon="💳" label="Received by" />
            <div className="mt-1.5">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${METHOD_STYLES[receivedBy] ?? 'bg-slate-100 text-slate-700'}`}>
                {receivedBy}
              </span>
            </div>
          </div>
        </div>

        {hasChequeDetails && (
          <div className="rounded-xl bg-slate-50 px-4 py-3">
            <FieldLabel icon="🧾" label="Cheque details" />
            <div className="mt-2 grid grid-cols-3 gap-2">
              {chequeNumber && (
                <div>
                  <div className="text-xs text-slate-400">No.</div>
                  <div className="break-words text-sm font-semibold text-slate-900">{chequeNumber}</div>
                </div>
              )}
              {chequeDate && (
                <div>
                  <div className="text-xs text-slate-400">Date</div>
                  <div className="break-words text-sm font-semibold text-slate-900">{formatDate(chequeDate)}</div>
                </div>
              )}
              {chequeBank && (
                <div>
                  <div className="text-xs text-slate-400">Bank</div>
                  <div className="break-words text-sm font-semibold text-slate-900">{chequeBank}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="bg-slate-50 px-6 py-4 text-center text-xs font-medium text-slate-400">
        Thank you for your payment!
      </div>
    </div>
  )
})

export default Receipt
