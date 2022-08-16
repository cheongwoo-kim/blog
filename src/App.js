import './App.css';
import { useState } from 'react';


function App() {
  let [title,setTitle] = useState(['남자코트 추천','강남 우동 맛집','파이썬독학']);
  let [like,setLike] = useState([0,0,0]);
  let [modal,setModal] = useState(false);
  let [modalNum,setModalNum] = useState(0);
  let [inputVal, setInputVal] = useState('');
  let [date, setDate] = useState(['2022/08/15','2022/08/16','2022/08/17']);
  let today = new Date();   

  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1;  // 월
  let day = today.getDate();  // 날짜
  return(
    <article>
      <header>
        <h4>ReactBlog</h4>
      </header>
      {
        title.map(function(v,i){
          return(
            <section className="wrapper" value={i} key={i}>
              <h4 onClick={() => {setModal(!modal);  setModalNum(i); 
              }}>{v}<span onClick={(e) => {e.stopPropagation(); let copy = [...like]; copy[i] += 1; setLike(copy);}}>👍</span>{like[i]} </h4>
              <p>{date[i]} 발행 </p> <button onClick={() =>{let copy = [...title]; copy.splice(i, 1); setTitle(copy)}}>삭제하기</button>
              <hr></hr>
            </section>
          )
        })
      }
      <input type="text" className="postTitle" onChange={(e) => {setInputVal(e.target.value);}}/>
      {/* array추가 할 때 기존 값 가져오고 추가 */}
      <button className="btn_add" onClick={() => {
         let title_val = document.querySelector('.postTitle').value;
         let likeCopy = [...like];
         let dateCopy = [...date];
         if(title_val){
            setTitle([...title,inputVal]);
            likeCopy.push(0);
            dateCopy.push(year +'/'+ month +'/'+ day);
            setDate(dateCopy);
            setLike(likeCopy);
          }else{
            alert('제목을 입력하세요')
            } 
        }}>글 추가</button>
      { modal === true ? <Modal date={date} title={title} modalNum={modalNum}/> : null}
    </article>
  );
function Modal(props){
  return(
    <section className="modal">
        <h4>{props.title[modalNum]}</h4>
        <p>{props.date[modalNum]}</p>
        <p>상세내용</p>
        <button onClick={() => {let copy = [...title]; copy[0] = '여자코트 추천'; setTitle(copy);}}>글수정</button>
      </section>
  )
}
}
export default App;
