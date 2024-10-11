import React, { useRef, useState } from 'react'

function Pagination({itemsPerPage,totalDocs}) {
    const totalPages = Math.ceil(totalDocs/itemsPerPage)
    const [page,setPage] = useState(new Array(totalPages).fill(0).map((_,index)=>index+1))
    const initialPageRef = useRef(1)
    const finalPageRef = useRef(3)

  return (
    <div className='flex'>

    </div>
  )
}

export default Pagination
