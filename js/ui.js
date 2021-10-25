$(document).ready(function(){
    //데이트객체 생성
    let date = new Date();

    const renderCalender = () => {
        const viewYear = date.getFullYear();
        const viewMonth = date.getMonth();

        // 오늘날짜 구하기
        document.querySelector('.dateTitle strong').textContent = `${viewYear}년 ${viewMonth + 1}월`;

        const prevLast = new Date(viewYear, viewMonth, 0); // 지난달 마지막 날짜
        const thisLast = new Date(viewYear, viewMonth + 1, 0); // 이번달 마지막 날짜

        // 지난달 마지막 날짜 및 요일
        const PLDate = prevLast.getDate();
        const PLDay = prevLast.getDay();

        // 이번달 마지막 날짜 및 요일
        const TLDate = thisLast.getDate();
        const TLDay = thisLast.getDay();

        //전체 달력 날짜
        const prevDates = []; // 초기값은 empty
        const thisDates = [...Array(TLDate + 1).keys()].slice(1);
        const nextDates = [];

        if (PLDay !== 6) {
            for (let i = 0; i < PLDay + 1; i++) {
            prevDates.unshift(PLDate - i);
            }
        }

        for (let i = 1; i < 7 - TLDay; i++) {
            nextDates.push(i);
        }

        const dates = prevDates.concat(thisDates, nextDates);
        const firstDateIndex = dates.indexOf(1);
        const lastDateIndex = dates.lastIndexOf(TLDate);

        dates.forEach((date, i) => {
            const condition = i >= firstDateIndex && i < lastDateIndex + 1
                ? 'this'
                : 'op';
            dates[i] = `<tr><td><div class="date"><span class="${condition}">${date}</span></div></td></tr>`
        });

        document.querySelector('.table tr td .dates').innerHTML = dates.join('');

        const today = new Date();
        if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
            for (let date of document.querySelectorAll('.this')) {
                if (+date.innerText === today.getDate()) {
                    date.classList.add('calToday');
                    break;
                }
            }
        }
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
