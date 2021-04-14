import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './styles.module.css'

export default function Button ({idNumber}) {
  const [comments, setComments] = useState([])
  const [data, setData] = useState({
    name: '',
    comments: ''
  })
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: [e.target.value]
    })
    console.log(data)
  }
  useEffect(() => {
  //get data from api
    axios.get('https://jsonplaceholder.typicode.com/comments', {
      responseType: 'json'
    })
      .then(function (res) {
        if (res.status == 200) {
          setComments(res.data)
        }
      }).catch(function (err) {
        console.log(err)
      })
  })
  function post () {
    axios.post('https://jsonplaceholder.typicode.com/comments', {
      data: {
        userId: 1,
        title: 'Esto es un post nuevo',
        body: 'cuerpo de este post. Me gusta la librería Axios!!'
      }
    })
      .then(function (res) {
        if (res.status ==201) {
          console.log('El nuevo Post ha sido almacenado con id: ')
        }
      })
      .catch(function (err) {
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
