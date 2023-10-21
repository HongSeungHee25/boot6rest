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
    document.querySelector('#idMessage').innerHTML =`<span class="text-sm"></span>`
}

document.querySelector('#clear').addEventListener('click',clear)
//콜백함수는 메소드 또는 함수안에서 인자로 사용되는 함수                            ㄴ 이게 콜백 함수
//addEventListener 는 클릭이 발생하면 실행시킬 clear 함수를 등록합니다.(브라우저에게 알려줌)
//브라우저는 #clear 의 클릭이 발생하는지 listener(감시)하고 있다가 사용자가 클릭하면
// clear 함수를 큐(자료구조)에 저장 합니다. (FIFO - 선입선출) 
//브라우저 스케줄링을 통해서 큐에 저장된 함수들을 순서대로 실행시켜 줍니다.
//큐에 저장하는 순서와 실행 순서는 개발자가 예측한 순서와 다를 수 있습니다.
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
    const subjectAll = result.subjects;
    arrSubject.splice(0,arrSubject.length)
    document.querySelectorAll('.subjects').forEach(item =>{
        if(subjectAll!=null && subjectAll.includes(item.value)) {    //includes 는 리턴타입이 boolean / indexOf 는 리턴타입이 int 라서 한번 더 조건식을 계산해야함.
            item.checked = true                     //contains(자바 String 메소드) 는 자바스크립트에서 사용불가
            arrSubject.push(item.value)           //조회한 관심분야로 배열 초기화
            // result.subjects 조회한 관심분야가 각 체크박스(subjects 클래스) 요소의 value 를 포함하고 있는지
            //각각 비교하여 checked 를 true 또는 false 로 설정하기
        }
        else item.checked = false
    })
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
//관심분야 선택 checked 로 문자열 만들기
const arrSubject = []
const checkSubject = e =>{
    // e.preventDefault()
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
//테스트
function test(){    //함수 선언을 이렇게 하면 끌어올리기 가능
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
//id 중복체크
let isvalid = false     //idCheck 결과를 저장하기 : 전역변수
const idcheck = function (){
    // let isValidId=false     //리턴 변수
    const id = document.querySelector('#id').value
    if(!id){
        alert('아이디를 입력하세요.')
        return
    }
    const xhr=new XMLHttpRequest()
    xhr.open('GET', '/api/bookuser/check/'+id);
    xhr.send()
    xhr.onload=function(){                                //요청에 대한 응답받았을 때 이벤트 onload 핸들러 함수
        if(xhr.status === 200 || xhr.status ===201){            // readyState 가 DONE
            const result = JSON.parse(xhr.response)               //자바스크립트 객체의 배열로 변환(역직렬화)
            console.log('응답 : ',result.exist)
            //서버 응답 exist 값으로 isValidId 저장. 존재하면 새로운 회원은 사용할 수 없는 아이디
            isvalid = !result.exist                               //result.exist 는 true 또는 false 를 리턴합니다.
            if(isvalid){                                          //존재하지 않은 id 일때 실행
                document.querySelector('#idMessage > span').innerHTML = '없는 아이디 입니다. 새로운 회원으로 사용 가능합니다.'
                document.querySelector('#idMessage > span').style.color = 'red'
                // userid = id
            }else{                                                //존재하는 id 일때 실행
                document.querySelector('#idMessage > span').innerHTML = '존재하는 아이디 입니다. 회원 정보 조회하세요.'
                document.querySelector('#idMessage > span').style.color = 'blue'
            }
        }else {
            console.error('오류1',xhr.status)
            console.error('오류2',xhr.response)
        }
    }
    // console.log('리턴 : ',isvalid)
    return isvalid;           //사용할 수 있으면 true

}
document.querySelector('#id').addEventListener('keyup',idcheck)



/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
//save 버튼 동작
const save = function () {              //리터럴 형식의 함수선언 : 끌어올리기 안됨. 사용하기 전에 선언
    const id = document.querySelector('#id').value;
    
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/bookuser');

    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    //id 중복확인
    let yn=false
    console.log("idcheck : ",isvalid)
    //비동기 함수 안에서 비동기 함수를 호출하는 것은 원하는 실행 결과를 받을 수 없음.
    //실행 타이밍이 우리의 예측과 다릅니다. 여기 idcheck 함수를 호출하면 안됨.
    if(!isvalid){           //idcheck 에 리턴이 true 이기 때문에 반대로 false 일때 사용할 alert
        alert('이미 사용중인 아이디 입니다.')
        return
    }else{
        yn = confirm(`아이디 '${id}' 로 회원가입 하시겠습니까?`)
        if(!yn) return;             //confirm 에서 취소누르면 false ▶ 함수 종료

    }
    //1. 입력값 가져오기
    const name = document.querySelector('#name').value;
    const password = document.querySelector('#password').value;
    const email = document.querySelector('#email').value;
    const birth = document.querySelector('#birth').value;

    //2. 입력값으로 자바스크립트 객체 생성(자바스크립트 객체는 미리 타입을 정의하지 않고 사용할수 있습니다.)
    const userData = {
        id: id,
        name: name,
        password: password,
        email: email,
        birth: birth,
        subjects: arrSubject.toString()
    };
    //3. 자바스크립트 객체를 json 전송을 위해 직렬화(문자열로 변환)
    const jsonData = JSON.stringify(userData);

    xhr.send(jsonData);

    xhr.onload = function () {
        const resultObj = JSON.parse(xhr.response);
        if (xhr.status === 200 || xhr.status === 201) {
            if(resultObj.count == 1){
                clear()
                document.querySelector('.card-header').innerHTML ='새로운 회원 \''+id+'\'가입 되었습니다'
                document.querySelector('.card-header').style.color='blue'
            }
        } else {
            console.error('오류1', xhr.status);
            console.error('오류2', xhr.response);
            const values=Object.values(resultObj);      //자바스크립트 객체는 key,value 구성 그 중에 value 만 가져와서 배열로 만듭니다.
            console.log('오류 메시지 : ',values)
            let resultMsg = ''
            values.forEach(msg=> resultMsg += msg + "<br>")             //배열에 대해 실행하는 반복
            document.querySelector('.card-header').innerHTML =resultMsg
            document.querySelector('.card-header').style.color='red'
        }
    };
    // setTimeout(clear,60000)
    // arrSubject.splice(0,arrSubject.length)  //배열 비우기. splice 요소 삭제 (인덱스 start부터 지정된 길이만큼)
}

document.querySelector('#save').addEventListener('click', save);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
//update 버튼 동작
const update = function () {
    const id = document.querySelector('#id').value;

    //1. 입력값 가져오기
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const birth = document.querySelector('#birth').value;
    const password = document.querySelector('#password').value;

    //2. 입력값으로 자바스크립트 객체 생성(자바스크립트 객체는 미리 타입을 정의하지 않고 사용할수 있습니다.)
    const userData = {
        id: id,
        name: name,
        email: email,
        birth: birth,
        password: password,
        subjects: arrSubject.toString()
    };
    //3. 자바스크립트 객체를 json 전송을 위해 직렬화(문자열로 변환)
    const jsonData = JSON.stringify(userData);

    const xhr = new XMLHttpRequest()
    xhr.open('PATCH', '/api/bookuser/'+id);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(jsonData);

    xhr.onload = function () {
        const resultObj = JSON.parse(xhr.response);
        if (xhr.status === 200 || xhr.status === 201) {
            if(resultObj.count == 1){
                clear()
                document.querySelector('.card-header').innerHTML ='회원 \'' + id + '\'의 정보가 수정되었습니다.'
                document.querySelector('.card-header').style.color='blue'
            }
        } else {
            console.error('오류1', xhr.status);
            console.error('오류2', xhr.response);
            const values=Object.values(resultObj);      //자바스크립트 객체는 key,value 구성 그 중에 value 만 가져와서 배열로 만듭니다.
            console.log('오류 메시지 : ',values)
            let resultMsg = ''
            values.forEach(msg=> resultMsg += msg + "<br>")             //배열에 대해 실행하는 반복
            document.querySelector('.card-header').innerHTML =resultMsg
            document.querySelector('.card-header').style.color='red'
        }
    };
    // setTimeout(clear,60000)
}
document.querySelector('#update').addEventListener('click', update);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
//delete 버튼 동작
//회원 삭제 : DELETE
const deleteUser = function () {
    const xhr = new XMLHttpRequest()

    const id = document.getElementById('id').value

    xhr.open('DELETE','/api/bookuser/'+id)
    xhr.send()
    xhr.onload=function(){
        const result = JSON.parse(xhr.response)
        let rstCount = Object.values(result)
        if((xhr.status === 200 || xhr.status ===201) && rstCount == 1){
            document.querySelector('.card-header').innerHTML = '['+id+'] 회원이 삭제되었습니다.'
            document.querySelector('.card-header').style.color = 'green'
            alert(id+'님 정보가 삭제되었습니다.')
        } else {
            console.error('오류1',xhr.status)
            console.error('오류2',xhr.response)

            let resultMsg = '삭제 실패 : '

            if(id.length == 0)
                resultMsg += 'ID 를 입력하세요'
            else
                resultMsg += '존재하지 않는 ID'

            document.querySelector('.card-header').innerHTML = resultMsg
            document.querySelector('.card-header').style.color = 'red'
        }
    }
    setTimeout(clear,7000)  //1000 = 1초
}

document.querySelector('#delete').addEventListener('click',deleteUser)

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
//컬럼별 수정 버튼 동작
//실제 프로젝트 할때는 패스워드, 이메일 변경 1개 필드 변경할 때 - 모달을 이용해서 입력값 받기
const changeOneField = function (e){
    e.stopPropagation();
    const target = e.target
    if(target.tagName != 'BUTTON') return
    const field=target.getAttribute("data-num")
    const id = document.querySelector('#id').value          //where 에 필요한 id
    let value = ''
    if(field == 'subjects')         //변경하려는 필드가 '관신분야' 일 때
        value=arrSubject.toString()
    else
        value=document.getElementById(field).value      //field는 변수명입니다.

    console.log('field : ',field)
    console.log('value : ',value)
    
    const jsObj={id:id}             //첫번째 id 는 프로퍼티 이름. 두번째 id 는 변수명
    jsObj[field] = value                    //jsObj 객체에 새로운 프로퍼티 field 와 그 값 추가
    console.log('object 중간 확인 : ',jsObj)

    const jsStr = JSON.stringify(jsObj)
    console.log(jsStr)

    const xhr = new XMLHttpRequest()
    xhr.open('PATCH','/api/bookuser/'+field+'/'+id)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.send(jsStr)      //5. 요청 전송. POST에서는  body와 함께 보냅니다.
    xhr.onload=function(){               //요청에 대한 응답받았을 때  onload 이벤트 핸들러 함수
        const resultObj = JSON.parse(xhr.response);
        if(xhr.status === 200 || xhr.status ===201){
            if(resultObj.count==1) {
                document.querySelector('.card-header').innerHTML = '회원 \'' + id + '\'의 \'' + resultObj.field + '\' 수정되었습니다.'
                document.querySelector('.card-header').style.color = 'orange'
            }
        }else {
            console.log('오류1-',xhr.response)
            console.log('오류2-',xhr.status)
            const values = Object.values(resultObj);
            console.log(values)
            let resultMsg =''
            values.forEach(msg =>
                resultMsg += msg +"<br>")

            document.querySelector('.card-header').innerHTML = resultMsg
        }
        setTimeout(clear,15000)
    }
}
document.querySelector('.card-body').addEventListener('click',changeOneField)