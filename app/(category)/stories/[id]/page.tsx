import { getStoriesById } from '@/api/stories'
import { getMarvelThumbnail } from '@/lib/marvel'
import Image from 'next/image'
import React from 'react'
import RelatedDataAccordion from './_components/RelatedDataAccordion'

type Props = {
  params: {
    id: string
  }
}

const Page = async ({ params }: Props) => {
  const { results: series } = await getStoriesById(params.id)

  if (!series) return <div>404</div>

  return (
    <div>
      <div className='p-4'>
        <Image
          alt={series.title}
          width={200}
          height={300}
          className='rounded-md max-w-[200px] m-auto'
          src={getMarvelThumbnail(series.thumbnail)}
        />
      </div>
      <h2 className='text-center font-medium my-3 text-2xl'>{series.title}</h2>
      <div className='text-slate-400 text-center text-sm mb-5'>
        <p> Series ID: {params.id}</p>
        <p>
          Modified:
          {series.modified
            ? new Date(series.modified).toLocaleString()
            : 'None'}
        </p>
      </div>
      <section className='mb-10'>
        <h3 className='font-medium text-xl text-center my-2'>Description</h3>
        <div className='mb-5'>
          <p>{series.description}</p>
        </div>
      </section>
      {/* <section className='mb-10'>
        <h3 className='font-medium text-xl text-center my-2'>Dates</h3>
        <ul>
          <li className='border border-gray-300 p-3 rounded-md mb-2 text-gray-500'>
            Year: {series.startYear} - {series.endYear}
          </li>
        </ul>
      </section> */}
      <h3 className='font-medium text-xl text-center my-2'>Related</h3>
      <RelatedDataAccordion storyId={params.id} />
    </div>
  )
}

export default Page
