import { getComicsById } from '@/api/comics'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getMarvelThumbnail } from '@/lib/marvel'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RelatedDataAccordion from './_components/RelatedDataAccordion'

type Props = {
  params: {
    id: string
  }
}

const ComicsDetail = async ({ params }: Props) => {
  const { results: comics } = await getComicsById(params.id)

  if (!comics) return <div>404</div>

  return (
    <div>
      <div className='p-4'>
        <Image
          alt={comics.title}
          width={200}
          height={300}
          className='rounded-md max-w-[200px] m-auto'
          src={getMarvelThumbnail(comics.thumbnail)}
        />
      </div>
      <h2 className='text-center font-medium my-3 text-2xl'>{comics.title}</h2>
      <div className='text-slate-400 text-center text-sm mb-5'>
        <p> Comics ID: {params.id}</p>
        <p>
          Modified:
          {comics.modified
            ? new Date(comics.modified).toLocaleString()
            : 'None'}
        </p>
      </div>

      <section className='mb-10'>
        <h3 className='font-medium text-xl text-center my-2'>Description</h3>
        <div className='mb-5'>
          <p>{comics.description}</p>
        </div>
      </section>

      <section className='mb-10'>
        <h3 className='font-medium text-xl text-center my-2'>Dates</h3>
        <ul>
          {comics.dates.map((date) => (
            <li
              key={date.type}
              className='border border-gray-300 p-3 rounded-md mb-2 text-gray-500'
            >
              {date.type}: {new Date(date.date).toLocaleString()}
            </li>
          ))}
        </ul>
      </section>

      <h3 className='font-medium text-xl text-center my-2'>Related</h3>
      <RelatedDataAccordion comicsId={params.id} />
    </div>
  )
}

export default ComicsDetail
