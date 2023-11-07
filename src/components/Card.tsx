import "./Card.css"

type CardProps = {
  icon: React.ReactNode
  onClick: () => void
  flipped: boolean
}

export const Card: React.FC<CardProps> = ({icon, flipped, onClick}) => {
  return  <div className="card" style={{backgroundColor: flipped ? 'cyan' : 'gray', minWidth: "50px", minHeight: "80px"}} onClick={onClick}>{flipped ? icon : "?"}</div>
}
