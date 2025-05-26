import type { MetadataRoute } from 'next'
import { lengList } from '../leng.config'

const baseUrl = process.env.NEXT_PUBLIC_LINK

export default function sitemap(): MetadataRoute.Sitemap {

  const languagesUrlList = (lengList: string[]) => {
    let res: {[key: string]: string} = {}
    for(const i of lengList){
      res[i] = baseUrl + `/${i}`
    }
    return res
  }

  const sitemap: MetadataRoute.Sitemap = [{
      url: baseUrl ?? 'http://localhost:4000',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: {
        languages: languagesUrlList(lengList),
      }
    }]

  return sitemap
}
