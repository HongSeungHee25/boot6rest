//clear 버튼 동작입니다. -> input 요소 초기화
const clear = function(){
    document.querySelector('#id').value=''
    document.querySelector('#name').value=''
    document.querySelector('#password').value=''
    document.querySelector('#email').value=''
    document.querySelector('#birth').value='1999-01-01'
    document.querySelector('#reg_date').value=''
    document.querySelectorAll('.subjects').forEach(item => item.checked =false)
    document.querySelector('#default').innerHTML =`<div class="card-header" id="messageBot">나는 메시지봇입니다.</div>`
}

document.querySelector('#clear').addEventListener('click',clear)
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
//selectAll 버튼 동작
const selectAll =function(){
    const xhr = new XMLHttpRequest()            //비동기 통신 객체 생성
    xhr.open('GET','/api/admin/bookusers')          //전송 보낼 준비 (url과 method)
    xhr.send()                                                  //요청 전송. body와 함께 보낼 때가 있습니다.
    xhr.onload=function(){                                //요청에 대한 응답받았을 때 이벤트 onload 핸들러 함수
        if(xhr.status === 200 || xhr.status ===201){            // readyState 가 DONE
            const list = JSON.parse(xhr.response)               //자바스크립트 객체의 배열로 변환(역직렬화)
            // console.log("get /api/admin/bookusers",list)
            makeList(list)
        }else {
            console.error('오류1',xhr.status)
            console.error('오류2',xhr.response)
        }
    }
}
document.querySelector('#selectAll').addEventListener('click',selectAll)

//응답받은 회원 목록을 태그로 출력하는 함수입니다.
const makeList = function (list){         //list 는 dto타입과 동일한 자바스크립트 객체 배열입니다.
    // console.log(list);

    document.querySelector('tbody').innerHTML =''         //테이블의 기존 내용은 clear
    //  전달받은 list 를 각 항목을 table td 태그로 출력
    list.forEach(item => {    //배열에서 하나 가져온 member
        const $tr = document.createElement("tr");
        const $temp=
                 `<td>${item.r}</td>
                  <td>${item.id}</td>
                  <td>${item.name}</td>
                  <td>${item.email}</td>
                  <td>${item.birth}</td>
                  <td>${item.reg_date}</td>
                  <td>${item.subjects}</td>` ;
        $tr.innerHTML=$temp;
        document.querySelector('tbody').appendChild($tr);
    });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
//selectOne 버튼 동작
const selectOne = function(){
    const xhr = new XMLHttpRequest()            //비동기 통신 객체 생성
    const id = document.getElementById('id').value
    if(!id){
        alert('아이디 입력은 필수입니다.')
        return
    }
    xhr.open('GET','/api/bookuser/'+id)          //전송 보낼 준비 (url과 method)
    xhr.send()                                                  //요청 전송. body와 함께 보낼 때가 있습니다.
    xhr.onload=function(){                                //요청에 대한 응답받았을 때 이벤트 onload 핸들러 함수
        if(xhr.status === 200 || xhr.status ===201){            // readyState 가 DONE
            const result = JSON.parse(xhr.response)               //자바스크립트 객체의 배열로 변환(역직렬화)
            resultOne(result)
            console.log("result : ",result)
        }else {
            console.error('오류1',xhr.status)
            console.error('오류2',xhr.response)
        }
    }

}
document.querySelector('#selectOne').addEventListener('click',selectOne)

const resultOne = function (result){
    document.querySelector('#id').value=result.id
    document.querySelector('#name').value=result.name
    document.querySelector('#password').value=result.password
    document.querySelector('#email').value=result.email
    document.querySelector('#birth').value=result.birth
    document.querySelector('#reg_date').value=result.reg_date
    document.querySelectorAll('.subjects').forEach(item =>{
        if(result.subjects.includes(item.value))    //includes 는 리턴타입이 boolean / indexOf 는 리턴타입이 int 라서 한번 더 조건식을 계산해야함.
            item.checked = true                     //contains(자바 String 메소드) 는 자바스크립트에서 사용불가
        // result.subjects 조회한 관심분야가 각 체크박스(subjects 클래스) 요소의 value 를 포함하고 있는지
        //각각 비교하여 checked 를 true 또는 false 로 설정하기
    })
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
//관심분야 선택 checked 로 문자열 만들기
const arrSubject = []
const checkSubject = e =>{
    e.stopPropagation()
    
    const target = e.target
    if(target.tagName !== 'INPUT'){return}
    
    if(target.checked) arrSubject.push(target.value)                //체크 상태이면 배열에 넣기
    else{
        const index = arrSubject.indexOf(target.value);     //해당 값의 배열 위치를 알아내기
        if(index !== -1){arrSubject.splice(index,1); }   //해당 위치에서 삭제하기
    }
    console.log(arrSubject)
}
//id 'checkSubjects' 는 checkbox input 모두를 포함하고 있는 div 태그 입니다.
//checkbox 요소가 많으므로 부모 요소에 이벤트를 주는 방식으로 합니다.
document.querySelector('#checkSubjects').addEventListener('click',checkSubject)

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
//save 버튼 동작
const save = function () {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/bookuser');
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    const id = document.querySelector('#id').value;
    const name = document.querySelector('#name').value;
    const password = document.querySelector('#password').value;
    const email = document.querySelector('#email').value;
    const birth = document.querySelector('#birth').value;

    const userData = {
        id: id,
        name: name,
        password: password,
        email: email,
        birth: birth,
        subjects: arrSubject.toString()
    };

    const jsonData = JSON.stringify(userData);

    xhr.send(jsonData);

    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
            alert('회원 등록 성공');
        } else {
            console.error('오류1', xhr.status);
            console.error('오류2', xhr.response);
        }

    };
}

document.querySelector('#save').addEventListener('click', save);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
//update 버튼 동작











/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
//delete 버튼 동작
