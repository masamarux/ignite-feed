import { ThumbsUp, Trash } from 'phosphor-react'
import {useState} from 'react';
import { Avatar } from './Avatar'
import styles from './Comment.module.css'

interface CommentProps {
  comment: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({comment, onDeleteComment}: CommentProps) {
  const [likeCount, setLikeCount] = useState(0)

  function handleDeleteComment() {
    onDeleteComment(comment);
  }

  function handleLikeComment() {
    setLikeCount(prevState => prevState + 1)
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src='https://github.com/masamarux.png' alt="" />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Marcelo Alves</strong>
              <time title='20 de Setembro às 20:21' dateTime='2022-09-20'> Cerca de 1h atrás</time>
            </div>

            <button onClick={handleDeleteComment} title='Deletar Comentário'><Trash size={24}/></button>
          </header>
          <p>
            {comment}
          </p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}