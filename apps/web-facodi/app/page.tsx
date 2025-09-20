import { redirect } from "next/navigation";

import { defaultLocale, localizedPaths } from "@monynha/i18n";

export default function IndexPage() {
  redirect(localizedPaths[defaultLocale].home);
}
