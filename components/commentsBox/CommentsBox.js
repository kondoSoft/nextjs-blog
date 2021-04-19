import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './styles.module.css'

export default function Button ({ idNumber }) {
  const initialData = {
    name: '',
    comment: ''
  }
  const [comments, setComments] = useState([])
  const [data, setData] = useState(initialData)
  axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'
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
    setComments(prevComments =>[...prevComments, { body: data.comment }])
     //setCount(prevCount => prevCount + 1); // 1
    axios.post('/comments', {
      info: {
        posId: idNumber,
        body: data.comment
      }
    })
      .then((res) => {
        if (res.status === 201) {
        getData()
        }
      })
      .catch((err) => {
        precomments => prevComments.pop()
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
  useEffect(() => {
    getData()
  }, [])
 console.log(comments)
  return (
    <div className={styles.container}>
      <forms className={styles.form}>
        <textarea className={styles.comments}
        rows='4' placeholder='comentarios' name='comment'
        onChange={handleChange}>
        </textarea>
        <div className={styles.containerButton}>
          <button className={styles.button} onClick={post}>
            comentar
          </button>
        </div>
      </forms>
      {
        comments.map(item => (
          <div key={item.id} className={styles.commentsContainer}>
            <p>{item.body}</p>
          </div>
        )).reverse()
      }
    </div>
  )
}
