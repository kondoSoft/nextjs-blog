import { useState, useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import styles from './styles.module.css'
import { Element, scroller } from 'react-scroll'

import Avatar from '../../components/Avatar/index.js'

axios.defaults.baseURL = 'https://ks-blog-backend-kondosoft-team.vercel.app/'

export default function Button ({ idNumber }) {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = (data, e) => {
    post(data)
    e.target.reset()
    scroller.scrollTo('scroll-line', {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: -200
    })
  }
  const [comments, setComments] = useState([])
  
  function getData () {
    axios.get(`/comments/${idNumber}`, {
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
      post_id: idNumber,
      name: data.name,
      body: data.comment
    })
      .then((res) => {
        if (res.status === 201) {
          getData()
        }
      })
      .catch((err) => {
        console.log(err)
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
        <div className={styles.inputContainer}>
          <textarea
            className={errors.comment ? styles.inputname + ' ' + styles.size100 : styles.comments + ' ' + styles.size100}
            rows='4' placeholder='comentarios'
            {...register('comment', { required: true })}
          />
          {errors.comment && <span className={styles.error + ' ' + styles.errorTexArea}>introduzca su comentario</span>}
        </div>
        <div className={styles.inputContainer}>
          <input
            className={errors.name ? styles.inputname : styles.comments}
            placeholder='nombre'
            {...register('name', { required: true })}
          />
          {errors.name && <span className={styles.error}>introduzca su nombre</span>}
        </div>
        <div className={styles.containerButton}>
          <input className={styles.button} type='submit' value='comentar' />
        </div>
      </form>
      <Element name='scroll-line' className={styles.line} />
      {
        comments.map((item, index) => (
          <div key={index} className={styles.commentsContainer + ' ' + styles.comments}>
            <Avatar initials={item.name}/>
            <div className={styles.infoUser}>
              <p className={styles.user}>{item.name}</p>
              <p>{item.body}</p>
            </div>
          </div>
        )).reverse()
      }
    </div>
  )
}
