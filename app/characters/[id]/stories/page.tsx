import React from 'react'
import StoriesList from './_components/StoriesList'

type Props = {
  params: {
    id: string
  }
}

const SeriesPage = ({ params }: Props) => {
  return (
    <div>
      <StoriesList id={params.id} />
    </div>
  )
}

export default SeriesPage
