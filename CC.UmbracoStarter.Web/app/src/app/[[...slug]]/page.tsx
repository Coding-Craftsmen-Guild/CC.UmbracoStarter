import HomePage from '@/components/pages/home-page/home-page'
import { PageTypes } from '@/constants/page-types.constants'
import { getContentByUrlSlugPath } from '@/services/delivery-api.service'
import { Page as ContentPage } from '@/types/delivery-api/global'
import { notFound } from 'next/navigation'

const getPage = (page: ContentPage<any>) => {
  const mapper = new Map([[PageTypes.HomePage.toString(), HomePage]])

  const PageComponent = mapper.get(page.contentType)

  if (!PageComponent) {
    return notFound()
  }

  return <PageComponent page={page} />
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const response = await getContentByUrlSlugPath<ContentPage<any>>((await params).slug)

  return getPage(response.data)
}
