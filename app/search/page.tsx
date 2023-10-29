import React from 'react'
import SearchList from './_components/SearchList'
import SearchTabs from './_components/SearchTabs'

type Props = {
  searchParams: {
    keyword: string
    category: string
  }
}

const SearchPage = async ({ searchParams }: Props) => {
  const { keyword, category } = searchParams

  return (
    <div>
      <h1 className='sr-only'>
        &quot;<strong>{keyword}</strong>&quot;의 검색 결과입니다
      </h1>
      <SearchTabs category={category} keyword={keyword} />
    </div>
  )
}

export default SearchPage
