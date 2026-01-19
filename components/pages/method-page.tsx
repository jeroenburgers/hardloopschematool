"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { getRoutes } from "@/lib/i18n/routes"
import { CTAButton } from "@/components/ui/cta-button"
import { StepNumber } from "@/components/ui/step-number"
import { MethodIllustration } from "@/components/ui/method-illustration"
import { CheckListItem } from "@/components/ui/check-list-item"
import { SectionHeader } from "@/components/ui/section-header"

export function MethodPage() {
  const { t, locale } = useLanguage()
  const routes = getRoutes(locale)

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-32 pb-24 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={t("pages.method.badge")}
            title={
              <>
                {t("pages.method.title")} <br />
                <span className="text-orange-600 dark:text-orange-500">
                  {t("pages.method.titleHighlight")}
                </span>
              </>
            }
            description={t("pages.method.description")}
          />

          <div className="space-y-32">
            {/* Step 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <StepNumber
                  number={t("pages.method.step1.number")}
                  variant="default"
                  className="mb-6"
                />
                <h2 className="text-3xl font-bold text-zinc-950 dark:text-zinc-50 mb-6">
                  {t("pages.method.step1.title")}
                </h2>
                <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
                  {t("pages.method.step1.description")}
                </p>
                <ul className="space-y-4">
                  <CheckListItem>{t("pages.method.step1.points.distance")}</CheckListItem>
                  <CheckListItem>{t("pages.method.step1.points.schedule")}</CheckListItem>
                  <CheckListItem>{t("pages.method.step1.points.physical")}</CheckListItem>
                </ul>
              </div>
              <MethodIllustration
                variant="intake"
                caption={t("pages.method.step1.visualization")}
              />
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="lg:order-2">
                <StepNumber
                  number={t("pages.method.step2.number")}
                  variant="orange"
                  className="mb-6"
                />
                <h2 className="text-3xl font-bold text-zinc-950 dark:text-zinc-50 mb-6">
                  {t("pages.method.step2.title")}
                </h2>
                <p
                  className="text-lg text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: t("pages.method.step2.description"),
                  }}
                />
                <div className="p-6 bg-zinc-950 dark:bg-zinc-800 rounded-2xl border border-zinc-800 dark:border-zinc-700 shadow-xl">
                  <p className="text-zinc-100 dark:text-zinc-200 font-medium italic text-lg leading-relaxed">
                    &ldquo;{t("pages.method.step2.quote")}&rdquo;
                  </p>
                </div>
              </div>
              <div className="lg:order-1">
                <MethodIllustration
                  variant="logic"
                  caption={t("pages.method.step2.visualization")}
                />
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <StepNumber
                  number={t("pages.method.step3.number")}
                  variant="emerald"
                  className="mb-6"
                />
                <h2 className="text-3xl font-bold text-zinc-950 dark:text-zinc-50 mb-6">
                  {t("pages.method.step3.title")}
                </h2>
                <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
                  {t("pages.method.step3.description")}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-xl shadow-sm">
                    <span className="block text-orange-600 dark:text-orange-500 font-black mb-1 text-xs uppercase tracking-wider">
                      {t("pages.method.step3.focus.label")}
                    </span>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest">
                      {t("pages.method.step3.focus.value")}
                    </span>
                  </div>
                  <div className="p-4 bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-xl shadow-sm">
                    <span className="block text-zinc-950 dark:text-zinc-50 font-black mb-1 text-xs uppercase tracking-wider">
                      {t("pages.method.step3.output.label")}
                    </span>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest">
                      {t("pages.method.step3.output.value")}
                    </span>
                  </div>
                </div>
              </div>
              <MethodIllustration
                variant="output"
                caption={t("pages.method.step3.visualization")}
              />
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-32 p-16 bg-zinc-950 dark:bg-zinc-900 rounded-[4rem] text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">
              {t("pages.method.cta.title")}
            </h2>
            <p className="text-zinc-400 dark:text-zinc-500 max-w-xl mx-auto mb-12 text-lg font-medium">
              {t("pages.method.cta.description")}
            </p>
            <CTAButton href={routes.createSchedule}>{t("pages.method.cta.button")}</CTAButton>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
