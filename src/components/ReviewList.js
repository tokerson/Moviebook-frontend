import React from 'react';
import '../css/ReviewList.css';
import { FaThumbsUp } from 'react-icons/fa';
import axios from 'axios';

const URL = 'http://localhost:8080';



const ReviewList = (props) => {

  

  const reviews = props.reviews ? props.reviews.map( review => {
      return(
          <div key={review.idReview} className="reviewItem">
            {review.content}
            <div onClick={() => props.callback(review.idReview)}>
                <p><FaThumbsUp id="like"/>    {review.amountOfLikes}</p>
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