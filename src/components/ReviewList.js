import React from 'react';
import '../css/ReviewList.css';
import { FaThumbsUp } from 'react-icons/fa';
import Button from '@material-ui/core/Button';

const ReviewList = (props) => {

  const reviews = props.reviews ? props.reviews.map( review => {
      return(
          <div key={review.idReview} className="reviewItem">
            {review.content}
            <div style={{display:"flex"}}>
                <div onClick={() => props.callback(review.idReview)}>

                  <p><FaThumbsUp id="like"/>    {review.amountOfLikes}</p>
                </div>
                {props.status === "Administrator" || props.status === "Editor" ?
                  <Button size="small" onClick={ () => props.removeReview(review.idReview)} >Delete review</Button> : null 
                }
            </div>
           
            
          </div>
      )
  }) : null;

  return (
    <div>
      <h2>Reviews</h2>
      <div className="reviewListWrapper">
        {reviews}  
      </div>    
    </div>
  );
}

export default ReviewList;