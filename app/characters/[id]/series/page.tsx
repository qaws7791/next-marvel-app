import React from 'react'
import Series from './_components/Series'

type Props = {
  params: {
    id: string
  }
}

const SeriesPage = ({ params }: Props) => {
  return (
    <div>
      <Series id={params.id} />
    </div>
  )
}

export default SeriesPage
