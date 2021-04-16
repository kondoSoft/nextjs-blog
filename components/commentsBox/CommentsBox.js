import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './styles.module.css'

export default function Button ({ idNumber }) {
  const [comments, setComments] = useState([])
  const [data, setData] = useState({
    name: '',
    comments: ''
  })
  axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'
  function getData () {
    axios.get('/posts', {
      responseType: 'json'
    })
      .then((res) => {
        if (res.status === 200) {
          setComments(res.data)
          console.log('data', res.data)
        }
      }).catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getData()
  }, [])
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: [e.target.value]
    })
  }
  function post () {
    axios.post('/posts', {
      info: {
        userId: 1,
        title: 'Esto es un post nuevo',
        body: data.comments
      }
    })
      .then((res) => {
        if (res.status === 201) {
          getData()
          console.log('El nuevo Post ha sido almacenado con id: ', res.data.info.body.toString() )
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  console.log(comments)
  return (
    <div className={styles.container}>
      <forms className={styles.form}>
        <textarea className={styles.comments}
        rows='4' placeholder='comentarios' name='comments'
        onChange={handleChange}>
        </textarea>
        <div className={styles.containerButton}>
          <button className={styles.button} onClick={post}>
            Send
          </button>
        </div>
      </forms>
      {
        comments.map(item => (
          <div key={item.id} className={styles.commentsContainer}>
            <p>{item.body}</p>
          </div>
        ))
      }
    </div>
  )
}
