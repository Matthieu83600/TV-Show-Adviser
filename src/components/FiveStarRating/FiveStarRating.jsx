import s from './style.module.css';
import { StarFill, Star as StarEmpty, StarHalf, Star } from 'react-bootstrap-icons';

export function FiveStarRating({ rating }) {
    // Création d'un tableau d'étoiles vide
    const starList = []
    // Stockage variable nb étoile pleine
    const starFillCount = Math.floor(rating);
    // Stockage variable demi étoile (oui/non)
    const hasStarHalf = rating - starFillCount >= 0.5;
    // Stockage variable nb étoile vide
    const emptyStarCount = 5 - starFillCount - (hasStarHalf ? 1 : 0);
    // Pusher étoile pleine
    for (let i = 1 ; i <= starFillCount ; i++) {
        starList.push(<StarFill key={"star-fill" + i} />);
    }
    // Pusher demi-étoile
    if(hasStarHalf) {
        starList.push(<StarHalf key={"star-half"} />)
    }
    // Pusher étoile vide
    for (let i = 1 ; i <= emptyStarCount ; i++) {
        starList.push(<StarEmpty key={"star-empty" + i} />);
    }
    return (
        <div>{starList}</div>
    )
}