import Header from '@/components/layout/header'
import { Repositories } from '@/constants/repository.constants'
import { getContentByQuery } from '@/services/delivery-api.service'
import { Configuration } from '@/types/delivery-api/configuration.repository'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const response = await getContentByQuery<Configuration>({
    filter: `contentType:${Repositories.Configuration}`,
    take: 1
  })
  const config = response.items?.[0]?.properties

  return (
    <>
      <Header {...config} />
      <main>{children}</main>
    </>
  )
}
