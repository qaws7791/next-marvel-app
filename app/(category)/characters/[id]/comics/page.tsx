import React from 'react'
import ComicsList from './_components/ComicsList'

type Props = {
  params: {
    id: string
  }
}

const ComicsPage = ({ params }: Props) => {
  return (
    <div>
      <ComicsList id={params.id} />
    </div>
  )
}

export default ComicsPage
