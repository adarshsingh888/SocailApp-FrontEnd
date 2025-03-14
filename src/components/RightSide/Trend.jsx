import React from 'react'
import { TrendData } from '../../../public/assets/TrendData'
function Trend() {
  return (
    <div className='flex flex-col m-4 p-4 bg-white rounded-xl w-92 mx-4 overflow-y-auto hide-scrollbar shadow-xl'>
      <h3 className='text-2xl'>
        Trends for you.
      </h3>
      <div>
        {
          TrendData.map((trend, id) => {
            return (
              <div key={id} className='flex flex-col m-2  items-start'>
                <span> #{trend.name}</span>
                <span> {trend.shares}k shares</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Trend