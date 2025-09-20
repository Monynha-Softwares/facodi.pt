"use client";

import { useState } from "react";

import { useTranslations } from "@/components/layout/translation-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { designTokens } from "@/lib/data/tokens";

const colorPreview = Object.entries(designTokens.colors).map(([name, value]) => ({
  name,
  swatch: typeof value === "string" ? value : (value.light ?? Object.values(value)[0]),
}));

const spacingPreview = Object.entries(designTokens.spacing);

export function DesignSystemShowcase() {
  const [email, setEmail] = useState("");
  const { messages } = useTranslations();
  const dict = messages.designSystem;

  return (
    <div className="space-y-12">
      <section aria-labelledby="colors-heading" className="space-y-6">
        <div>
          <h2 id="colors-heading" className="text-2xl font-semibold">
            {dict.colors.title}
          </h2>
          <p className="text-sm text-muted">{dict.colors.subtitle}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {colorPreview.map((entry) => (
            <div key={entry.name} className="rounded-lg border border-border">
              <div className="h-24 rounded-t-lg" style={{ background: entry.swatch }} aria-hidden />
              <div className="space-y-1 p-4 text-sm">
                <p className="font-semibold">{entry.name}</p>
                <p className="text-muted">{entry.swatch}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="components-heading" className="space-y-6">
        <div>
          <h2 id="components-heading" className="text-2xl font-semibold">
            {dict.components.title}
          </h2>
          <p className="text-sm text-muted">{dict.components.subtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{dict.components.formTitle}</CardTitle>
              <CardDescription>{dict.components.formDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <label htmlFor="showcase-email" className="text-sm font-medium">
                {dict.components.emailLabel}
              </label>
              <Input
                id="showcase-email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={messages.forms.emailPlaceholder}
              />
              <Button type="button" onClick={() => setEmail("")}>
                {dict.components.submit}
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{dict.components.interactionsTitle}</CardTitle>
              <CardDescription>{dict.components.interactionsDescription}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary">{dict.components.dialogButton}</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{dict.components.dialogTitle}</DialogTitle>
                    <DialogDescription>{dict.components.dialogDescription}</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button type="button">{dict.components.confirm}</Button>
                    <Button type="button" variant="ghost">
                      {dict.components.cancel}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <TooltipProvider delayDuration={200} skipDelayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost">{dict.components.tooltipButton}</Button>
                  </TooltipTrigger>
                  <TooltipContent>{dict.components.tooltip}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardContent>
          </Card>
        </div>
      </section>

      <section aria-labelledby="spacing-heading" className="space-y-4">
        <div>
          <h2 id="spacing-heading" className="text-2xl font-semibold">
            {dict.spacing.title}
          </h2>
          <p className="text-sm text-muted">{dict.spacing.subtitle}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border p-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              {dict.spacing.spacingLabel}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {spacingPreview.map(([key, value]) => (
                <li
                  key={key}
                  className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-2"
                >
                  <span>{key}</span>
                  <code className="text-xs">{value}</code>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border p-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              {dict.spacing.radiusLabel}
            </h3>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              {Object.entries(designTokens.radius).map(([key, value]) => (
                <div key={key} className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 bg-primary/30"
                    style={{ borderRadius: value }}
                    aria-hidden
                  />
                  <div className="flex flex-col">
                    <span>{key}</span>
                    <code className="text-xs">{value}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
