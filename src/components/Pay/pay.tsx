import { persistor } from '../../store/store'
import { Iamport, RequestPayParams, RequestPayResponse } from '../../types'

declare global {
  interface Window {
    IMP?: Iamport
  }
}

const onClickPayment = (Allsum: number) => {
  if (!window.IMP) return
  /* 1. 가맹점 식별하기 */
  const { IMP } = window
  IMP.init('imp77778822') // 가맹점 식별코드

  /* 2. 결제 데이터 정의하기 */
  const data: RequestPayParams = {
    pg: 'kakaopay',
    name: '여행 리스트',
    pay_method: 'card',
    merchant_uid: `mid_${new Date().getTime()}`,
    amount: Allsum,
    buyer_tel: '00-000-0000',
  }

  /* 4. 결제 창 호출하기 */
  IMP.request_pay(data, callback)
}

/* 3. 콜백 함수 정의하기 */
function callback(response: RequestPayResponse) {
  const { success, error_msg } = response

  if (success) {
    alert('결제 성공')
    persistor.purge()
    window.location.reload()
  } else {
    alert(`${error_msg}`)
  }
}

export default onClickPayment
