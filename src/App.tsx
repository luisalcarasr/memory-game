import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { Card } from './components/Card'
import { shuffle } from 'lodash'
import { faFacebook, faInstagram, faPlaystation, faReddit, faSteam, faTiktok, faTwitch, faTwitter, faVuejs, faXTwitter, faXbox, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const getIcons = () => {
  return [
    faFacebook,
    faTwitch,
    faTwitter,
    faXTwitter,
    faYoutube,
    faInstagram,
    faReddit,
    faPlaystation,
    faXbox,
    faSteam,
    faVuejs,
    faTiktok
  ]
}

function App() {
  const [size] = useState(12)
  const [attempts, setAttempts] = useState(0)
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [timeoutIndex, setTimeoutIndex] = useState<number | null>(null)


  const deck = useMemo(() => {
    const items = [...Array(size)].map((_, i) => i)
    return shuffle([...items, ...items])
  }, [size])

  useEffect(() => {
    if (flipped.length === 2) {
      setAttempts(attempts + 1)
      const [a, b] = flipped
      if (deck[a] === deck[b] && a !== b) {
        if (!matched.includes(deck[a])) {
          setMatched([...matched, deck[a]])
        }
      }
      setTimeoutIndex(setTimeout(() => {
        setFlipped([])
      }, 1000))
    }

    if (matched.length === size) {
      const score: number[] = JSON.parse(window.localStorage.getItem('score') ?? '[]')
      score.push(Math.trunc(matched.length / attempts * 100))
      window.localStorage.setItem('score', JSON.stringify(score))
      alert(`You won! Score: ${matched.length} Attempts: ${attempts} Total Score: ${Math.trunc(matched.length / attempts * 100)}`)
      window.location.reload()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipped])

  const onFlip = (i: number) => {
    if (flipped.length === 2) {
      clearTimeout(timeoutIndex!)
      setFlipped([i])
    } else if (matched.includes(deck[i])) {
      setFlipped([])
    } else {
      setFlipped([...flipped, i])
    }
  }

  return (
    <>
      <div>Score: {matched.length} Attempts: {attempts} Total Score: {Math.trunc(matched.length / attempts * 100) || 0} Previous scores: { window.localStorage.getItem('score') ?? 'No scores yet' }</div>
      { deck.map((i, key) => <Card flipped={flipped.includes(key) || matched.includes(i)} onClick={() => onFlip(key)} key={key} icon={<FontAwesomeIcon icon={getIcons()[i]} size={'2xl'} />} />) }
    </>
  )
}

export default App
