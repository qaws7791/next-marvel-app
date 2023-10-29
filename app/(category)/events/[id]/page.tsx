import React from 'react'
import RelatedDataAccordion from './_components/RelatedDataAccordion'
import { getEventsById } from '@/api/events'
import Image from 'next/image'
import { getMarvelThumbnail } from '@/lib/marvel'

type Props = {
  params: {
    id: string
  }
}

const Page = async ({ params }: Props) => {
  const { results: events } = await getEventsById(params.id)

  if (!events) return <div>404</div>

  return (
    <div>
      <div>
        <div className='p-4'>
          <Image
            alt={events.title}
            width={200}
            height={300}
            className='rounded-md max-w-[200px] m-auto'
            src={getMarvelThumbnail(events.thumbnail)}
          />
        </div>
        <h2 className='text-center font-medium my-3 text-2xl'>
          {events.title}
        </h2>
        <div className='text-slate-400 text-center text-sm mb-5'>
          <p> Events ID: {params.id}</p>
          <p>
            Modified:
            {events.modified
              ? new Date(events.modified).toLocaleString()
              : 'None'}
          </p>
        </div>

        <section className='mb-10'>
          <h3 className='font-medium text-xl text-center my-2'>Description</h3>
          <div className='mb-5'>
            <p>{events.description}</p>
          </div>
        </section>

        {/* <section className='mb-10'>
        <h3 className='font-medium text-xl text-center my-2'>Dates</h3>
        <ul>
          {events.dates.map((date) => (
            <li
              key={date.type}
              className='border border-gray-300 p-3 rounded-md mb-2 text-gray-500'
            >
              {date.type}: {new Date(date.date).toLocaleString()}
            </li>
          ))}
        </ul>
      </section> */}

        <h3 className='font-medium text-xl text-center my-2'>Related</h3>
        <RelatedDataAccordion eventId={params.id} />
      </div>
    </div>
  )
}

export default Page
