import React from 'react'
import  './SingleCard.css'


export default function SingleCard({ card, handleChoice, flipped,disabled }) {

    const handleClick = () => {
        if(!disabled){
            handleChoice(card)
        }
    }

  return (
    <div className='card'>
        <div className={flipped ? 'flipped': ''}>
            <img className="front" src={card.src}  alt='front card'/>
            <img 
                className='back' 
                src='/images/cover.png'  
                alt='back card' 
                onClick={handleClick}
            />
        </div>
    </div>
  )
}
