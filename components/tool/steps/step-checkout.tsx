import type { PersonalInfo } from "@/lib/types/schedule"

/**
 * Step Checkout component
 * SOLAR: Autonomous Component - handles checkout information independently
 */
interface CheckoutTranslations {
  firstName: string
  lastName: string
  email: string
  address: string
  summary: string
  product: string
  anchorPrice: string
  price: string
  vat: string
  guarantee: string
  investment: string
}

interface StepCheckoutProps {
  personalInfo: PersonalInfo
  translations: CheckoutTranslations
  onPersonalInfoChange: (info: Partial<PersonalInfo>) => void
}

export function StepCheckout({
  personalInfo,
  translations,
  onPersonalInfoChange,
}: StepCheckoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 p-10 bg-zinc-50 dark:bg-zinc-900/50 border-2 border-zinc-100 dark:border-zinc-800 rounded-[3rem]">
        <div className="flex flex-col gap-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            {translations.firstName}
          </label>
          <input
            type="text"
            placeholder="Jan"
            value={personalInfo.firstName}
            onChange={(e) => onPersonalInfoChange({ ...personalInfo, firstName: e.target.value })}
            className="bg-white dark:bg-zinc-900/50 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-zinc-950 dark:focus:border-zinc-600 transition-all shadow-sm text-zinc-950 dark:text-zinc-50"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            {translations.lastName}
          </label>
          <input
            type="text"
            placeholder="Jansen"
            value={personalInfo.lastName}
            onChange={(e) => onPersonalInfoChange({ ...personalInfo, lastName: e.target.value })}
            className="bg-white dark:bg-zinc-900/50 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-zinc-950 dark:focus:border-zinc-600 transition-all shadow-sm text-zinc-950 dark:text-zinc-50"
          />
        </div>
        <div className="lg:col-span-2 flex flex-col gap-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            {translations.email}
          </label>
          <input
            type="email"
            placeholder="jan@voorbeeld.nl"
            value={personalInfo.email}
            onChange={(e) => onPersonalInfoChange({ ...personalInfo, email: e.target.value })}
            className="bg-white dark:bg-zinc-900/50 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-zinc-950 dark:focus:border-zinc-600 transition-all shadow-sm text-zinc-950 dark:text-zinc-50"
          />
        </div>
        <div className="lg:col-span-2 flex flex-col gap-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            {translations.address}
          </label>
          <input
            type="text"
            placeholder="Hoofdstraat 1"
            value={personalInfo.address}
            onChange={(e) => onPersonalInfoChange({ ...personalInfo, address: e.target.value })}
            className="bg-white dark:bg-zinc-900/50 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-zinc-950 dark:focus:border-zinc-600 transition-all shadow-sm text-zinc-950 dark:text-zinc-50"
          />
        </div>
      </div>

      <div className="lg:col-span-5 p-12 bg-zinc-950 dark:bg-zinc-900 text-white rounded-[3rem] flex flex-col justify-between shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/20 dark:bg-orange-500/20 blur-[80px] rounded-full -mr-16 -mt-16" />
        <div>
          <h3 className="text-2xl font-black mb-8 border-b border-white/10 pb-6 tracking-tighter">
            {translations.summary}
          </h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-widest">
              {translations.product}
            </span>
            <span className="text-base font-black line-through text-zinc-600 italic">
              {translations.anchorPrice}
            </span>
          </div>
          <div className="flex justify-between items-end mb-8">
            <span className="text-sm text-zinc-100 font-bold">{translations.investment}</span>
            <div className="flex flex-col items-end">
              <span className="text-4xl font-black text-orange-500 leading-none">
                {translations.price}
              </span>
              <span className="text-[9px] font-bold text-zinc-500 mt-2 uppercase tracking-widest">
                {translations.vat}
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="text-orange-500 text-2xl">🛡️</div>
            <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest leading-relaxed">
              {translations.guarantee}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
