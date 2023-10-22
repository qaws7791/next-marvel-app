import React from 'react'
import EventsList from './_components/EventsList'

type Props = {
  params: {
    id: string
  }
}

const SeriesPage = ({ params }: Props) => {
  return (
    <div>
      <EventsList id={params.id} />
    </div>
  )
}

export default SeriesPage
