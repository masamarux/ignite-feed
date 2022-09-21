import { format, formatDistanceToNow } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR'
import { FormEvent, useState, ChangeEvent, InvalidEvent } from 'react';
import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'

interface PostProps {
  id: number;
  author: {
    avatarUrl: string;
    name: string;
    role: string;
  },
  content: {
    type: "paragraph" | "link";
    content: string;
  }[],
  publishedAt: Date
}

export function Post({author, content, publishedAt}: PostProps) {
  const [comments, setComments] = useState<string[]>([])
  const [newCommentText, setNewCommentText] = useState('')
  const isNewCommentEmpty = newCommentText.length <= 0;
  
  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, newCommentText])
    setNewCommentText('')
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value)
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Este campo é obrigatório');
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(comment => comment !== commentToDelete);
    setComments(commentsWithoutDeletedOne);
  }

  return (
    <article className={styles.post}>
      <header >
        <div className={styles.author}>
          <Avatar src={author.avatarUrl}  />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time 
          title={format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
              locale: ptBr
          })} 
          dateTime={publishedAt.toISOString()}
        >
          {
            formatDistanceToNow(publishedAt, {
              locale: ptBr,
              addSuffix: true,
            })
          }
        </time>
      </header>

      <div className={styles.content}>
        {
          content.map(line => {
            if(line.type === 'paragraph') {
              return <p key={line.content}>{line.content}</p>
            } else if (line.type === 'link') {
              return <a key={line.content} href=''>{line.content}</a>
            }
          })
        }
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name='comment'
          placeholder='Deixe um comentário'
          onChange={handleNewCommentChange}
          value={newCommentText}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button disabled={isNewCommentEmpty} type='submit'>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {
          comments.map((comment => (
            <Comment key={comment} comment={comment} onDeleteComment={deleteComment} />
          )))
        }
      </div>
    </article>
  )
}