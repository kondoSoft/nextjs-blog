import { useState, useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import styles from './styles.module.css'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'

export default function Button ({ idNumber }) {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = (data, e) => { post(data), e.target.reset() }
  const [comments, setComments] = useState([])
  
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
  
  function post (data) {
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

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className={styles.container}>
      <form className={styles.size100} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.comments + ' ' + styles.inputname}
          placeholder='nombre'
          {...register('name', { required: true })}
        />
        {errors.name ? window.alert('introdusca su nombre') : null}
        <textarea
          className={styles.comments + ' ' + styles.size100}
          rows='4' placeholder='comentarios'
          {...register('comment', { required: true })}
        />
        {errors.name ? window.alert('introdusca su comentario') : null}
        <div className={styles.containerButton}>
          <input className={styles.button} type='submit' value='comentar' />
        </div>
      </form>
      <spam className={styles.line} />
      {
        comments.map((item, index) => (
          <div key={index} className={styles.commentsContainer + ' ' + styles.comments}>
            <p className={styles.user}>{item.name}</p>
            <p>{item.body}</p>
          </div>
        )).reverse()
      }
    </div>
  )
}
