type Topic = {
  name: string
  topic: string
  img: string
  mainFolder: string
}

export const topics: Topic[] = [
  {
    name: 'Markdoc (This template)',
    topic: 'Markdoc',
    img: '/logos/markdoc.png',
    mainFolder: 'starting'
  },
  {
    name: 'JavaScript',
    topic: 'JavaScript',
    img: '/logos/js.png',
    mainFolder: 'general-description'
  },
  {
    name: 'Node JS',
    topic: 'Node',
    img: '/logos/node.png',
    mainFolder: 'general'
  },
  {
    name: 'Java',
    topic: 'Java',
    img: '/logos/java.png',
    mainFolder: 'introduction'
  },
  {
    name: 'MongoDB',
    topic: 'mongodb',
    img: '/logos/mongodb.png',
    mainFolder: 'general'
  },
  {
    name: 'PostgreSQL',
    topic: 'postgresql',
    img: '/logos/postgresql.png',
    mainFolder: 'general'
  }
]