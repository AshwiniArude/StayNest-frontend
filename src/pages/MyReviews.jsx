import React, { useState } from 'react';
import { FaStar, FaEdit, FaTrash, FaPlus, FaMapMarkerAlt, FaCalendarAlt, FaCheck, FaTimes } from 'react-icons/fa';
import '../styles/MyReviews.css';

const MyReviews = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedPG, setSelectedPG] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  // Mock data for reviews
  const [reviews, setReviews] = useState([
    {
      id: 1,
      pgName: "Sunshine PG for Girls, Koramangala",
      location: "Koramangala, Bangalore",
      rating: 5,
      date: "2024-01-15",
      reviewText: "Amazing experience! The rooms are clean, food is delicious, and the staff is very helpful. The location is perfect with easy access to metro and shopping areas. Highly recommended for anyone looking for a comfortable stay.",
      status: "published",
      thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300"
    },
    {
      id: 2,
      pgName: "Urban Nest Co-living, Gachibowli",
      location: "Gachibowli, Hyderabad",
      rating: 4,
      date: "2024-01-10",
      reviewText: "Great community living experience. The facilities are modern and well-maintained. The food quality is good and the location is convenient for tech professionals.",
      status: "published",
      thumbnail: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=300"
    },
    {
      id: 3,
      pgName: "Elite Girls Hostel, HSR Layout",
      location: "HSR Layout, Bangalore",
      rating: 3,
      date: "2024-01-05",
      reviewText: "The location is good and the rooms are decent. However, the food could be better and some amenities need maintenance. Overall okay for the price.",
      status: "published",
      thumbnail: "https://images.unsplash.com/photo-1560448204-5c9a0c9a0c9a?w=300"
    }
  ]);

  // Mock data for stays without reviews
  const [pendingReviews, setPendingReviews] = useState([
    {
      id: 4,
      pgName: "Comfort Zone PG, Andheri West",
      location: "Andheri West, Mumbai",
      checkOutDate: "2024-01-20",
      thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300"
    },
    {
      id: 5,
      pgName: "Student Haven, Sector 18",
      location: "Sector 18, Noida",
      checkOutDate: "2024-01-25",
      thumbnail: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=300"
    }
  ]);

  const allReviews = [...reviews, ...pendingReviews];

  const filteredReviews = activeTab === 'all' 
    ? allReviews 
    : activeTab === 'published' 
    ? reviews 
    : pendingReviews;

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmitReview = () => {
    if (rating === 0 || !reviewText.trim() || !checkInDate || !checkOutDate) {
      alert('Please provide rating, review text, check-in and check-out dates');
      return;
    }
    
    if (isEditing) {
      // Update existing review
      setReviews(prevReviews => 
        prevReviews.map(review => 
          review.id === editingReviewId 
            ? { ...review, rating, reviewText, date: new Date().toISOString().split('T')[0], checkInDate, checkOutDate }
            : review
        )
      );
      setIsEditing(false);
      setEditingReviewId(null);
    } else {
      // Add new review
      const selectedPGData = pendingReviews.find(pg => pg.id.toString() === selectedPG);
      if (selectedPGData) {
        const newReview = {
          id: Date.now(), // Generate unique ID
          pgName: selectedPGData.pgName,
          location: selectedPGData.location,
          rating: rating,
          date: new Date().toISOString().split('T')[0],
          reviewText: reviewText,
          status: "published",
          thumbnail: selectedPGData.thumbnail,
          checkInDate,
          checkOutDate
        };
        
        setReviews(prevReviews => [...prevReviews, newReview]);
        
        // Remove from pending reviews
        setPendingReviews(prevPending => 
          prevPending.filter(pg => pg.id.toString() !== selectedPG)
        );
        
        console.log('New review added:', newReview);
      }
    }
    
    setShowSuccessMessage(true);
    setShowReviewForm(false);
    setSelectedPG('');
    setRating(0);
    setReviewText('');
    setHoveredRating(0);
    setCheckInDate('');
    setCheckOutDate('');
    
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleEditReview = (reviewId) => {
    const reviewToEdit = reviews.find(review => review.id === reviewId);
    if (reviewToEdit) {
      setIsEditing(true);
      setEditingReviewId(reviewId);
      setRating(reviewToEdit.rating);
      setReviewText(reviewToEdit.reviewText);
      setSelectedPG(reviewToEdit.pgName);
      setCheckInDate(reviewToEdit.checkInDate || '');
      setCheckOutDate(reviewToEdit.checkOutDate || '');
      setShowReviewForm(true);
    }
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
    }
  };

  const handleCloseForm = () => {
    setShowReviewForm(false);
    setIsEditing(false);
    setEditingReviewId(null);
    setSelectedPG('');
    setRating(0);
    setReviewText('');
    setHoveredRating(0);
    setCheckInDate('');
    setCheckOutDate('');
  };

  const getRatingText = (rating) => {
    const ratings = {
      1: "Poor",
      2: "Fair", 
      3: "Good",
      4: "Very Good",
      5: "Excellent"
    };
    return ratings[rating] || "";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="my-reviews-container">
      {/* Header Section */}
      <section className="header-section">
        <div className="header-content">
          <h1>My Reviews</h1>
          <p>Share your experience and help others find the right stay.</p>
        </div>
      </section>

      {/* Tabs/Filters */}
      <section className="tabs-section">
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Reviews ({allReviews.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'published' ? 'active' : ''}`}
            onClick={() => setActiveTab('published')}
          >
            Published Reviews ({reviews.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending Reviews ({pendingReviews.length})
          </button>
        </div>
      </section>

      {/* Write Review Button */}
      {activeTab === 'pending' && pendingReviews.length > 0 && (
        <section className="write-review-section">
          <button 
            className="write-review-btn"
            onClick={() => setShowReviewForm(true)}
          >
            <FaPlus />
            Write a Review
          </button>
        </section>
      )}

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="modal-overlay">
          <div className="review-modal">
            <div className="modal-header">
              <h2>{isEditing ? 'Edit Review' : 'Write a Review'}</h2>
              <button 
                className="close-btn"
                onClick={handleCloseForm}
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="review-form">
              <div className="form-group">
                <label>Select PG</label>
                <select 
                  value={selectedPG}
                  onChange={(e) => setSelectedPG(e.target.value)}
                  disabled={isEditing}
                >
                  <option value="">Choose a PG to review</option>
                  {isEditing ? (
                    <option value={selectedPG}>{selectedPG}</option>
                  ) : (
                    pendingReviews.map(pg => (
                      <option key={pg.id} value={pg.id}>
                        {pg.pgName} - {pg.location}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <div className="form-group">
                <label>Check-in Date</label>
                <input type="date" value={checkInDate} onChange={e => setCheckInDate(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Check-out Date</label>
                <input type="date" value={checkOutDate} onChange={e => setCheckOutDate(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Rating</label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`star ${star <= (hoveredRating || rating) ? 'filled' : ''}`}
                      onClick={() => handleRatingChange(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                    />
                  ))}
                  {rating > 0 && (
                    <span className="rating-text">{getRatingText(rating)}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Your Review</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience, what you liked/disliked, and any tips for future tenants..."
                  rows="6"
                  maxLength="1000"
                />
                <div className="char-count">
                  {reviewText.length}/1000 characters
                </div>
              </div>

              <div className="form-actions">
                <button 
                  className="cancel-btn"
                  onClick={handleCloseForm}
                >
                  Cancel
                </button>
                <button 
                  className="submit-btn"
                  onClick={handleSubmitReview}
                >
                  {isEditing ? 'Update Review' : 'Post Review'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <section className="reviews-section">
        <div className="reviews-grid">
          {filteredReviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="pg-info">
                  <img 
                    src={review.thumbnail} 
                    alt={review.pgName}
                    className="pg-thumbnail"
                  />
                  <div className="pg-details">
                    <h3>{review.pgName}</h3>
                    <p className="location">
                      <FaMapMarkerAlt />
                      {review.location}
                    </p>
                    <p className="date">
                      <FaCalendarAlt />
                      {review.status === 'published' 
                        ? (
                            <>
                              Reviewed on {formatDate(review.date)}
                              {review.checkInDate && review.checkOutDate && (
                                <><br />Stay: {formatDate(review.checkInDate)} - {formatDate(review.checkOutDate)}</>
                              )}
                            </>
                          )
                        : `Stayed until ${formatDate(review.checkOutDate)}`
                      }
                    </p>
                  </div>
                </div>
                
                {review.status === 'published' && (
                  <div className="review-actions">
                    <button 
                      className="action-btn edit"
                      onClick={() => handleEditReview(review.id)}
                      title="Edit Review"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDeleteReview(review.id)}
                      title="Delete Review"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>

              {review.status === 'published' ? (
                <div className="review-content">
                  <div className="rating-display">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`star ${star <= review.rating ? 'filled' : ''}`}
                      />
                    ))}
                    <span className="rating-text">{getRatingText(review.rating)}</span>
                  </div>
                  
                  <div className="review-text">
                    {review.reviewText.length > 200 
                      ? `${review.reviewText.substring(0, 200)}...`
                      : review.reviewText
                    }
                    {review.reviewText.length > 200 && (
                      <button className="view-full-btn">View Full</button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="pending-review">
                  <p>You haven't reviewed this PG yet.</p>
                  <button 
                    className="write-review-btn small"
                    onClick={() => setShowReviewForm(true)}
                  >
                    Write Review
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="success-message">
          <FaCheck />
          {isEditing ? 'Review updated successfully!' : 'Review submitted successfully!'}
        </div>
      )}
    </div>
  );
};

export default MyReviews; 