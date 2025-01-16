import { Inter } from 'next/font/google'

import { getContentByUrlSlugPath } from '@/services/delivery-api.service'
import { Page } from '@/types/delivery-api/global'
import { getUrlFromLink } from '@/utils/data-types.utils'
import { GetServerSideProps, Metadata } from 'next'
import { ViewTransitions } from 'next-view-transitions'
import { notFound } from 'next/navigation'
import './globals.css'
import './styles.scss'

const inter = Inter({ subsets: ['latin'] })

export const getServerSideProps: GetServerSideProps = async context => {
  const slug = context.params?.slug as string[]
  const response = await getContentByUrlSlugPath(slug)

  if (!response.isSuccess && response.statusCode === 404) {
    return { notFound: true }
  }

  return {
    props: {
      page: response.data
    }
  }
}

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ViewTransitions>
        <body className={inter.className}>{children}</body>
      </ViewTransitions>
    </html>
  )
}
