import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import "./globals.scss";
import Header from "@/components/organisms/Header/Header";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Museum",
  description: "Museum",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <GoogleTagManager gtmId={process.env.CONTENTFUL_GTAG_ID || ""} />
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
