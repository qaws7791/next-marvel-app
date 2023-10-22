import React from 'react'
import SearchList from './_components/SearchList'

type Props = {
  params: {
    name: string
  }
}

const SearchPage = async ({ params: { name } }: Props) => {
  const decodedName = decodeURIComponent(name)

  return (
    <div>
      <h1 className='sr-only'>
        &quot;<strong>{decodedName}</strong>&quot;의 검색 결과입니다
      </h1>
      <SearchList name={decodedName} />
    </div>
  )
}

export default SearchPage
