import { useSelector } from 'react-redux'
import TripFitler from '../components/Card/TripFilter'
import TripCard from '../components/Card/TripCards'
import { RootState } from '../store/store'

function MainPage() {
  const tripFilter = useSelector((state: RootState) => state.Triplist)
  console.log(tripFilter)
  return (
    <div>
      <TripFitler />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        {tripFilter.result.map(list => (
          <TripCard
            key={list.idx}
            idx={list.idx}
            name={list.name}
            mainImage={list.mainImage}
            description={list.description}
            spaceCategory={list.spaceCategory}
            price={list.price}
            maximumPurchases={list.maximumPurchases}
            registrationDate={list.registrationDate}
          />
        ))}
      </div>
      {/* <TripCard /> */}
    </div>
  )
}

export default MainPage
