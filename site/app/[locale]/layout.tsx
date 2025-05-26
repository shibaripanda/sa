import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { lengList } from '../../leng.config';

export async function generateMetadata(
  { params }: any,
): Promise<Metadata> {

  const { locale } = await params
  const seo = await import(`../../seo/${locale}.json`).then((m) => m.default)

  const languagesUrlList = (lengList: string[]) => {
    let res: {[key: string]: string} = {}
    for(const i of lengList){
      res[i] = process.env.NEXT_PUBLIC_LINK + `/${i}`
    }
    return res
  }
 
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: process.env.NEXT_PUBLIC_LINK + `/${locale}`,
      locale: locale,
      siteName: 'Your Site',
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_LINK + `/${locale}`,
      languages: languagesUrlList(lengList),
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>; 
}) {
  const { locale } = await params; 
  
  if (!lengList.includes(locale)) {
    notFound();
  }

  const messages = await import(`../../locales/${locale}.json`).then((m) => m.default)

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
    </NextIntlClientProvider>
  );
}