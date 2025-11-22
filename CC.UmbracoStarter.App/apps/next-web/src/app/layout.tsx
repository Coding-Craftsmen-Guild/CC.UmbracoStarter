import { Inter } from 'next/font/google'

import { getContentByUrlSlugPath } from '@/services/delivery-api.service'
import { Page } from '@/types/delivery-api/global'
import { getUrlFromLink } from '@/utils/data-types.utils'
import { Metadata } from 'next'
import { ViewTransitions } from 'next-view-transitions'
import { notFound } from 'next/navigation'
import './globals.css'
import './styles.scss'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({
  params
}: {
  params: { slug: string[] }
}): Promise<Metadata> {
  const { data, isSuccess, statusCode } = await getContentByUrlSlugPath<Page<any>>(params.slug)

  if (!isSuccess && statusCode === 404) notFound()

  return {
    title: data.properties.seoTitle || data.name,
    description: data.properties.seoDescription,
    keywords: data.properties.seoKeywords,
    alternates: {
      canonical: getUrlFromLink(data.properties.canonicalLink?.[0])
    },
    openGraph: {
      title: data.properties.seoTitle || data.name,
      description: data.properties.seoDescription
    },
    twitter: {
      title: data.properties.seoTitle || data.name,
      description: data.properties.seoDescription
    }
  }
}

export default async function RootLayout({ 
  children,
  params 
}: { 
  children: React.ReactNode
  params?: { slug: string[] }
}) {
  // Handle 404s for invalid routes
  if (params?.slug) {
    const response = await getContentByUrlSlugPath(params.slug)
    
    if (!response.isSuccess && response.statusCode === 404) {
      notFound()
    }
  }

  return (
    <html lang="en">
      <ViewTransitions>
        <body className={inter.className}>{children}</body>
      </ViewTransitions>
    </html>
  )
}
