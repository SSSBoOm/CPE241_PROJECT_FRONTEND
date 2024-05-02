import React from 'react'
import FacilityCard from '../../components/Card/FacilityCard'

const Facility: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        <FacilityCard image="Room_1.jpg" name="Deluxe" content="Your mom" />
        <FacilityCard image="Room_2.jpg" name="Deluxe" content="Your mom" />
        <FacilityCard image="Room_3.jpg" name="Deluxe" content="Your mom" />
        <FacilityCard image="Room_1.jpg" name="Deluxe" content="Your mom" />
        <FacilityCard image="Room_2.jpg" name="Deluxe" content="Your mom" />
        <FacilityCard image="Room_3.jpg" name="Deluxe" content="Your mom" />
      </div>
    </div>
  )
}

export default Facility
