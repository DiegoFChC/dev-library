import type { JSX } from 'react'
import { SectionTitle } from '../SectionTitle/SectionTitle'
import { TopicButton } from '../TopicButton/TopicButton'
import { topics } from './Topics'
import './Landing.css'

export function Landing(): JSX.Element {
  return (
    <article className='Landing'>
      <section className='mainTitle'>
        <div className='background'></div>
        <h1>
          <strong>./ Dev Library</strong>
        </h1>
        <p>
          Recopilación personal de <span>notas</span>, <span>cheatsheets</span> y <span>ejemplos prácticos</span> sobre lenguajes de programación, frameworks y herramientas.
          <br /><strong>¡Directo al grano!</strong>
        </p>
      </section>
      <SectionTitle title='Notas personales'>
        <div className='cards'>
          {
            topics?.map(item => {
              const { name, topic, img, mainFolder } = item
              return (
                <TopicButton key={topic} name={name} topic={topic} img={img} folder={mainFolder} />
              )
            })
          }
        </div>
      </SectionTitle>
    </article>
  )
}
