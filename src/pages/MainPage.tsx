import { useSelector } from 'react-redux'
import TripFitler from '../components/Card/TripFilter'
import TripCard from '../components/Card/TripCards'
import { RootState } from '../store/store'

function MainPage() {
  const tripFilter = useSelector((state: RootState) => state.Triplist)

  const itemDataList =
    tripFilter.itemfilter?.length > 0
      ? tripFilter.itemfilter
      : tripFilter.result

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
        {itemDataList.map(list => (
          <TripCard
            key={list.idx + +100}
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
    </div>
  )
}

export default MainPage
