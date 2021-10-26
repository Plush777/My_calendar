$(document).ready(function(){
    //데이트객체 생성 (날짜와 시간을 위한 메소드를 제공)
    let date = new Date();

    const renderCalender = () => {
        // getFullYear : 주어진 날짜의 현지시간 기준 "연도"를 반환
        // getMonth : Date 객체의 월 값을 현지 시간에 맞춰 반환. (이 때 월은 0부터 시작)
        const viewYear = date.getFullYear();
        const viewMonth = date.getMonth();

        /* textContent에 담은 값을 dateTitle strong 태그로 가져와서 HTML에 출력.
            viewMonth에 1을 더한 이유는 getMonth 메소드가 0월부터 시작하기 때문
        */
        /* textContent : Node 속성으로 태그 상관없이 style , script 태그 상관없이 노드가 
        가지고 있는 텍스트 값을 읽음.
        > https://hianna.tistory.com/483*/
        document.querySelector('.dateTitle strong').textContent = `${viewYear}년 ${viewMonth + 1}월`;


        // 새로운 Date 객체를 생성할때 파라미터에 0을 전달하여 지난달과 이번달의 마지막 날짜를 구함.
        const prevLast = new Date(viewYear, viewMonth, 0); // 지난달 마지막 날짜
        const thisLast = new Date(viewYear, viewMonth + 1, 0); // 이번달 마지막 날짜
        console.log(prevLast)
        console.log(thisLast)


        // getDate : 현지시간 기준 일자를 반환.
        // getDay : 현지시간 기준 요일을 반환 (일요일 ~ 토요일은 0 ~ 6으로 표시)
        // prevLast의 요일은 목(Thu) 요일이므로 4를 반환하고, 일자는 30이므로 30 반환.
        const PLDate = prevLast.getDate();
        const PLDay = prevLast.getDay();
        console.log(PLDate);
        console.log(PLDay)


        // thisLast의 요일은 일(Sun) 요일 일자는 31이므로, 0과 31을 반환.
        const TLDate = thisLast.getDate();
        const TLDay = thisLast.getDay();

        console.log(TLDate)
        console.log(TLDay)

        //전체 달력 날짜
        const prevDates = []; // 이전 달의 날짜가 담겨있는 배열 (26,27,28,29,30)
        const thisDates = [...Array(TLDate + 1).keys()].slice(1)
        /* 
            1. Array로 배열을 생성 (길이가 n인 배열이 생성되고, 안에있는 모든 요소들은 undefined)

            2. 모든 요소들의 값이 빈 상태이기 때문에 keys 메소드를 활용해서 0부터 n-1 까지의 배열 반복자가 생성됨
            + keys 메소드는 배열 값들의 인덱스를 반환하기 때문에 keys 메소드가 없으면 값 순서를 알 수없기 때문에 undefined
            
            3. 전개구문 (Sperad 문법) 을 통해서 배열을 펼칠 수 있음.
            + console.log(TLDate) 콘솔을 찍어보면, TLDate의 값이 31이였기 때문에 전개 구문으로 31을 펼쳐서 
            0 ~ 31까지의 날짜 데이터가 thisDates에 들어오게 됨.
            https://bigtop.tistory.com/62

            4. ...Array(TLDate).keys() 인 상태에서 콘솔로 찍어보면, 배열 안에 있는 날짜 데이터가 31개까지 나오긴하지만
            0에서 시작하기 때문에 결국은 값이 30까지밖에 안나옴. 
            그래서 TLDate에 1을 더하여 값이 31까지 나오도록 해주고 0은 slice(1) 로 첫번째 (배열 순서로는 0) 값을 제거해줌.
        */
        console.log(thisDates);
        const nextDates = []; // 다음 달의 날짜가 담겨있는 배열 (1,2,3,4,5,6)
        
        // 반복문으로 빈 배열인 prevDates , nextDates 채우기
        /* unshift() : 새로운 값을 배열의 맨 앞쪽에 추가하고 새로운 길이를 반환.
        https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift
        */ 
        if (PLDay !== 6) { // 만약 PLDay 값이 6이랑 같지 않을경우
            for (let i = 0; i < PLDay + 1; i++) { // PLDay가 6이 되기 전까지 반복
                //console.log(i)
                prevDates.unshift(PLDate - i); /* PLDate (0,1,2,3,4)를 가지고 있고, i는 5를 가지고 있음.
                마이너스 기호를 썼으므로, 지난 달인 9월의 마지막 날짜부터 1씩 줄어든 값을 출력
                */
            }
        }
        console.log(prevDates)

        // push() : 배열의 끝에 요소를 추가할 수 있음.
        /* i < 7 - TLDay : TLDay의 값이 0이기 때문에 TLDay - 7 이라고 쓰면 0 - 7이 되기때문에 계산이 안됨.*/
        for (let i = 1; i < 7 - TLDay; i++) { // 7이 되기 전까지 반복
            nextDates.push(i); // nextDates 배열에 i값 추가
            // i의 값이 6이기 때문에 nextDates 배열에 1,2,3,4,5,6 추가
        }
        console.log(nextDates)

        /*
        prevDates : 이전 달의 마지막 날짜가 담겨있음.
        thisDates : 이번 달의 날짜가 담겨있음.
        nextDates : 다음 달의 첫 날짜가 담겨있음.

        이 배열들을 concat() 메소드로 dates에 합침
        */
        const dates = prevDates.concat(thisDates, nextDates);
        console.log(dates)
        /* indexOf : 지정된 값의 인덱스를 반환. */
        const firstDateIndex = dates.indexOf(1); //dates 배열 안에 있는 값 1의 인덱스 찾기
        console.log(firstDateIndex)
        const lastDateIndex = dates.lastIndexOf(TLDate); //dates 배열 안에있는 값 31의 인덱스 찾기
        console.log(lastDateIndex)

        dates.forEach((date, i) => {
            /* i가 firstDateIndex보다 크고, i가 lastDateIndex보다 작을경우 
                true이면 this , false이면 op 
                (dates.forEach이기 때문에 i는 dates 배열에 있는 42개의 값을 가지고 있음.)
                + forEach() 메소드는 배열의 요소들을 순회함.
            */
            const condition = i >= firstDateIndex && i < lastDateIndex + 1 // 31일까지 있는 경우
                ? 'this' //true
                : 'op'; //false
            /* span에 class로 true 또는 false 값을 넣고, span태그에는 현지 기준 날짜와 시간 데이터를 넣음. 
            담은 데이터들을 i로 전달받아 dates 배열에 담음.  */
            dates[i] = `<tr><td><div class="date"><span class="${condition}">${date}</span></div></td></tr>`
        });

        /* dates 태그에 dates 배열에 담았던 데이터들을 HTML로 출력하고, join() 메소드를 사용하여 dates 배열
        안에있는 값들을 연결해서 하나로 만듬.*/
        // join() : 배열에 있는 값들을 모두 연결해서 하나의 값으로 만듬. 
        document.querySelector('.table tr td .dates').innerHTML = dates.join('');

        /* 새로운 Date 객체 생성 */
        const today = new Date();
        
        if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
            for (let date of document.querySelectorAll('.this')) {
                console.log(typeof date)
                if (+date.innerText === today.getDate()) {
                    console.log(typeof date)
                    date.classList.add('calToday');
                    break;
                }
            }
        }

        /* 
            1. 자바스크립트 내장 함수로 새로만든 today 객체에 년도와 월 데이터를 받아옴.
            1-2. 받아온 년도와 월 데이터가 viewMonth , viewYear 와 일치하는지 비교.

            2. 결과가 true 일경우 date 객체에 있는 클래스 'this' 를 모두 찾기를 반복
            2-2. 
        */
    };

    renderCalender();

    var calPrev = document.getElementsByClassName('calPrev');
    var calNext = document.getElementsByClassName('calNext');
    var calToday = document.getElementsByClassName('calToday');
    function prevM(){
        date.setDate(1);
        date.setMonth(date.getMonth() - 1);
        renderCalender();
    }
    function nextM(){
        date.setDate(1);
        date.setMonth(date.getMonth() + 1);
        renderCalender();
    }
    function todayBack(){
        date = new Date();
        renderCalender();
    }
    for (var i = 0; i < calPrev.length; i++) {
		calPrev[i].addEventListener('click', prevM);
	}
    for (var i = 0; i < calNext.length; i++) {
		calNext[i].addEventListener('click', nextM);
	}
    for (var i = 0; i < calToday.length; i++) {
		calToday[i].addEventListener('click', todayBack);
	}
})
