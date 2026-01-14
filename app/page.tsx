"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, Target, TrendingUp, Zap } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function Home() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    doel: "",
    niveau: "",
    dagenPerWeek: "",
    startDatum: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implementeer schema generatie logica
    console.log("Formulier ingediend:", formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t("common.appName")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("common.description")}
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <Target className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>{t("features.personalized.title")}</CardTitle>
              <CardDescription>{t("features.personalized.description")}</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>{t("features.progressive.title")}</CardTitle>
              <CardDescription>{t("features.progressive.description")}</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-orange-600 mb-2" />
              <CardTitle>{t("features.flexible.title")}</CardTitle>
              <CardDescription>{t("features.flexible.description")}</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Main Form Card */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">{t("form.title")}</CardTitle>
            <CardDescription>{t("form.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="doel">{t("form.goal.label")}</Label>
                <Select
                  value={formData.doel}
                  onValueChange={(value) => setFormData({ ...formData, doel: value })}
                >
                  <SelectTrigger id="doel">
                    <SelectValue placeholder={t("form.goal.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5k">{t("form.goal.options.5k")}</SelectItem>
                    <SelectItem value="10k">{t("form.goal.options.10k")}</SelectItem>
                    <SelectItem value="halve-marathon">
                      {t("form.goal.options.halfMarathon")}
                    </SelectItem>
                    <SelectItem value="marathon">{t("form.goal.options.marathon")}</SelectItem>
                    <SelectItem value="conditie">{t("form.goal.options.fitness")}</SelectItem>
                    <SelectItem value="gewichtsverlies">
                      {t("form.goal.options.weightLoss")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="niveau">{t("form.level.label")}</Label>
                <Select
                  value={formData.niveau}
                  onValueChange={(value) => setFormData({ ...formData, niveau: value })}
                >
                  <SelectTrigger id="niveau">
                    <SelectValue placeholder={t("form.level.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">{t("form.level.options.beginner")}</SelectItem>
                    <SelectItem value="licht-gevorderd">
                      {t("form.level.options.intermediate")}
                    </SelectItem>
                    <SelectItem value="gevorderd">{t("form.level.options.advanced")}</SelectItem>
                    <SelectItem value="zeer-gevorderd">{t("form.level.options.expert")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dagenPerWeek">{t("form.frequency.label")}</Label>
                <Select
                  value={formData.dagenPerWeek}
                  onValueChange={(value) => setFormData({ ...formData, dagenPerWeek: value })}
                >
                  <SelectTrigger id="dagenPerWeek">
                    <SelectValue placeholder={t("form.frequency.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">{t("form.frequency.options.2")}</SelectItem>
                    <SelectItem value="3">{t("form.frequency.options.3")}</SelectItem>
                    <SelectItem value="4">{t("form.frequency.options.4")}</SelectItem>
                    <SelectItem value="5">{t("form.frequency.options.5")}</SelectItem>
                    <SelectItem value="6">{t("form.frequency.options.6")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDatum">{t("form.startDate.label")}</Label>
                <Input
                  id="startDatum"
                  type="date"
                  value={formData.startDatum}
                  onChange={(e) => setFormData({ ...formData, startDatum: e.target.value })}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={
                  !formData.doel ||
                  !formData.niveau ||
                  !formData.dagenPerWeek ||
                  !formData.startDatum
                }
              >
                <Calendar className="mr-2 h-4 w-4" />
                {t("form.submit")}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 text-muted-foreground">
          <p>{t("footer.text")}</p>
        </div>
      </div>
    </div>
  )
}
