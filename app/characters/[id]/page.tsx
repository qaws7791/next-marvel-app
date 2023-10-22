import React from 'react'
import Image from 'next/image'
import { getCharacterById } from '@/api/characters'
import { MarvelImageVariants } from '@/constants/marvel'
import Link from 'next/link'

type Props = {
  params: {
    id: string
  }
}

const CharacterDetail = async ({ params }: Props) => {
  const { results: character } = await getCharacterById(params.id)

  if (!character) return <div>404</div>

  const relatedItems = [
    { name: 'Comics', path: 'comics', available: character.comics.available },
    { name: 'Series', path: 'series', available: character.series.available },
    {
      name: 'Stories',
      path: 'stories',
      available: character.stories.available,
    },
    { name: 'Events', path: 'events', available: character.events.available },
  ]

  return (
    <div>
      <div className='p-4'>
        <Image
          alt='thumbnail'
          width={464}
          height={261}
          className='rounded-md'
          src={`${character.thumbnail.path}/${MarvelImageVariants.detail}.${character.thumbnail.extension}`}
        />
      </div>
      <h2 className='text-center font-medium text-lg my-3'>{character.name}</h2>
      <h3 className='font-medium text-xl text-center my-2'>Description</h3>
      <div className='mb-5'>
        <p>{character.description}</p>
      </div>
      <h3 className='text-center font-medium text-lg my-2'>Related Data</h3>
      <ul className='grid grid-cols-2 gap-4 mb-5 '>
        {relatedItems.map((item) => (
          <li
            key={item.name}
            className='text-center border border-gray-400 rounded-md hover:bg-gray-100 hover:cursor-pointer'
          >
            <Link
              href={`/characters/${params.id}/${item.path}`}
              className='p-2 flex flex-col items-center'
            >
              <span className='font-bold'>{item.name}</span>
              <p>{item.available}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className='text-slate-400 text-center'>
        <p> Character ID: {params.id}</p>
        <p>
          Modified:
          {character.modified
            ? new Date(character.modified).toDateString()
            : 'None'}
        </p>
      </div>
    </div>
  )
}

export default CharacterDetail
