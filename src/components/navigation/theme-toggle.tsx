"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { useTranslations } from "@/components/layout/translation-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { messages } = useTranslations();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? (theme ?? "light") : "light";
  const label = `${messages.navigation.theme}: ${messages.theme[currentTheme === "dark" ? "dark" : "light"]}`;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
    >
      {currentTheme === "dark" ? (
        <Moon aria-hidden className="h-5 w-5" />
      ) : (
        <Sun aria-hidden className="h-5 w-5" />
      )}
    </Button>
  );
}
