import {PencilLine} from 'phosphor-react';
import { Avatar } from './Avatar';

import styles from './Sidebar.module.css'

export function Sidebar(){
  return(
    <aside className={styles.sidebar}>
      <img 
        src='https://images.unsplash.com/photo-1521185496955-15097b20c5fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50'
        className={styles.cover}
      />

      <div className={styles.profile}>
        <Avatar src='https://github.com/masamarux.png' />
        <strong>Marcelo Alves</strong>
        <span>Web Developer</span>
      </div>

      <footer className={styles.footer}>
        <a href='#'>
          <PencilLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  );
}