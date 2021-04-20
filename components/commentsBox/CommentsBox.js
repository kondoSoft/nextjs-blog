import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './styles.module.css'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'

export default function Button ({ idNumber }) {
  let booleanButton = true
  const initialData = {
    name: '',
    comment: ''
  }
  const [comments, setComments] = useState([])
  const [data, setData] = useState(initialData)
  
  function getData () {
    axios.get('/comments', {
      responseType: 'json'
    })
      .then((res) => {
        if (res.status === 200) {
          setComments(res.data)
        }
      }).catch((err) => {
        window.alert('Ha ocurrido un error por favor volver a intentarlo')
      })
  }
  
  function post () {
    document.getElementById('name').value = ''
    document.getElementById('comment').value = ''
    setData(initialData)
    setComments(prevComments => [...prevComments, {
      name: data.name,
      body: data.comment
    }
    ])
    axios.post('/comments', {
      info: {
        posId: idNumber,
        name: data.name,
        body: data.comment
      }
    })
      .then((res) => {
        if (res.status === 201) {
          getData()
        }
      })
      .catch((err) => {
        prevComments => prevComments.pop()
        setComments([...comments])
        window.alert('Ha ocurrido un error por favor volver a intentarlo')
      })
  }

  function handleChange (e) {
    setData({
      ...data,
      [e.target.name]: [e.target.value]
    })
  }

  booleanButton = data.comment === '' || data.name === ''
  
  useEffect(() => {
    getData()
  }, [])
console.log(initialData)
  return (
    <div className={styles.container}>
      <forms className={styles.size100}>
        <input id='name' className={styles.comments+ ' '+ styles.inputname}
         placeholder='nombre' type='text' name='name' onChange={handleChange}/>
        <textarea id='comment' className={styles.comments+' '+ styles.size100}
        rows='4' placeholder='comentarios' name='comment'
        onChange={handleChange}>
        </textarea>
        <div className={styles.containerButton}>
          <button className={styles.button} onClick={post} disabled={booleanButton}>
            comentar
          </button>
        </div>
      </forms>
      <spam className={styles.line}></spam>
      {
        comments.map((item, index)=> (
          <div key={index} className={styles.commentsContainer + ' ' + styles.comments}>
            <p className={styles.user}>{item.name}</p>
            <p>{item.body}</p>
          </div>
        )).reverse()
      }
    </div>
  )
}
