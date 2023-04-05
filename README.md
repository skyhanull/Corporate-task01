# ✈️ 라이크어로컬 pre-onboarding-9th-2-3 과제 제출
수정
<p>
<img alt="Typescript" src="https://img.shields.io/badge/Typescript-v4.9.4-3178C6?style=plastic&logoColor=white%22/%3E"/>
<img alt="React" src="https://img.shields.io/badge/React-v18.2.0-61DAFB?style=plastic&logo=react&logoColor=white"/>
<img alt="React Router" src="https://img.shields.io/badge/React Router-v6.8.0-CA4245?style=plastic&logo=reactrouter&logoColor=white"/>
</p>


## ✍ 실행 방법 

---

```sh
git clone // this repository
cd this file location
npm install
npm run dev
```

## 배포 사이트
https://corporate-task01-dnb8-bzu6gbsc7-skyhanull.vercel.app/main


## 리팩토링을 진행한 이유
```
1. 팀프로젝트에서 회의를 해서 vite,eslint,prettier를 설치하기로 했지만 이것은 스스로 설치하지 않고 팀장님이 세팅을 한 것이기에
개인적으로 처음부터 세팅을 하고 싶기 때문입니다.
2.이번 과제들을 하면서 필터링에 대한 부분을 고민할 수 있는 시간을 가지게 됬는데 이 전의 코드에서는 hook을 이용하여 필터링을 구현했지만
 useSearchParams을 이용해 url query params를 이용하여 Url에 따라 변경되게 구현을 고치고 싶었기 때문입니다
3.앞선 과제에서 뒤늦게 localstorge기능을 추가하려 해서 구현을 끝내지 못했고 이때 localstorage를 slice안에서 구현하려 했는데
이는 사이드이펙트를 조장하는 구현이라 하여 slice에서 구현하는 것이 아니고 persist를 이용해 구현을 하고 싶었습니다.

```


## 힘들었던 점
```
1. usestate hook이 비동기적으로 사용이 되기 때문에 useSearchparams로 url에 바로 key,value를 넣으려 했지만
비동기로 진행이되어 바로 적용이 되지 않았음 sethook에 함수를 넣어 해결해보려 했지만 작동이 되지 않았음
해결 방법으로 UseEffect로 이용
```
