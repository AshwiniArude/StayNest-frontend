import React, { useState, useEffect } from 'react';
import { FaStar, FaEdit, FaTrash, FaPlus, FaMapMarkerAlt, FaCalendarAlt, FaCheck, FaTimes } from 'react-icons/fa';
import '../styles/MyReviews.css';

import { getReviewsByTenant, addReview, updateReview, deleteReviewById } from '../services/ReviewService';
import bookingService from '../services/BookingService';

const MyReviews = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [selectedPG, setSelectedPG] = useState(null); // Stores the full PG object for review
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [hoveredRating, setHoveredRating] = useState(0);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [listings, setListings] = useState([]); // All listings from bookings
    const [reviews, setReviews] = useState([]); // Published reviews
    const [pendingReviews, setPendingReviews] = useState([]); // Stays without reviews

    useEffect(() => {
        const tenantId = localStorage.getItem('id'); // Assuming tenant ID is stored in localStorage
        console.log("Tenant ID from localStorage:", tenantId); // Debug log

        const fetchData = async () => {
            try {
                const [reviewRes, bookingRes] = await Promise.all([
                    getReviewsByTenant(tenantId),
                    bookingService.getMyBookings(tenantId)
                ]);

                console.log('Reviews from API:', reviewRes);
                console.log('Bookings from API:', bookingRes);

                const userReviews = reviewRes || [];
                const userBookings = bookingRes || [];

                const reviewedListingIds = new Set(userReviews.map(r => r.listing?.id));

                // Transform reviews to desired frontend format
                const published = userReviews.map(r => {
                    const {
                        id,
                        rating,
                        feedback, // Backend uses 'feedback' for review text
                        createdAt,
                        checkInDate,
                        checkOutDate,
                        listing = {}
                    } = r;

                    const {
                        id: listingId,
                        title: pgName,
                        address: location,
                        thumbnailUrl: thumbnail
                    } = listing;

                    return {
                        id,
                        rating,
                        reviewText: feedback, // Map feedback to reviewText
                        date: createdAt,
                        checkInDate,
                        checkOutDate,
                        pgName,
                        location,
                        thumbnail: listing.url || 'https://via.placeholder.com/150',
                        listingId,
                        status: 'published'
                    };
                });

                const pending = userBookings
                    .filter(b => b.status !== 'CANCELLED' && new Date(b.endDate) < new Date() && !reviewedListingIds.has(b.listing?.id))
                    .map(b => {
                        const {
                            id,
                            startDate: checkInDate,
                            endDate: checkOutDate,
                            listing = {}
                        } = b;

                        const {
                            id: listingId,
                            title: pgName,
                            address: location,
                            thumbnailUrl: thumbnail
                        } = listing;

                        return {
                            id, // This is the booking ID for pending reviews
                            checkInDate,
                            checkOutDate,
                            pgName,
                            location,
                            thumbnail: listing.url || 'https://via.placeholder.com/150',
                            listingId, // This is the listing ID
                            status: 'pending'
                        };
                    });

                // Collect unique listings from both reviews and bookings
                const listingMap = new Map();
                [...userReviews, ...userBookings].forEach(item => {
                    const listing = item.listing;
                    if (listing && !listingMap.has(listing.id)) {
                        listingMap.set(listing.id, listing);
                    }
                });
                const uniqueListings = Array.from(listingMap.values());

                setReviews(published);
                setPendingReviews(pending);
                setListings(uniqueListings);
            } catch (err) {
                console.error('Failed to load reviews/bookings:', err);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this runs once on mount

    // --- START OF THE CHANGE ---
    // Change this line:
    // const allReviews = [...reviews, ...pendingReviews];
    // To:
    const allReviews = [...reviews]; // "All Reviews" should only show published ones
    // --- END OF THE CHANGE ---

    const filteredReviews = activeTab === 'all'
        ? allReviews
        : activeTab === 'published'
            ? reviews
            : pendingReviews;

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmitReview = async () => {
        if (rating === 0 || !reviewText.trim() || !checkInDate || !checkOutDate || !selectedPG || !selectedPG.listingId) {
            alert('Please provide rating, review text, check-in, check-out dates, and select a PG.');
            return;
        }

        const tenantId = localStorage.getItem('id'); // Get tenant ID from localStorage
        if (!tenantId) {
            alert('Tenant ID not found. Please log in again.');
            return;
        }

        console.log("Submitting review for listing ID:", selectedPG?.listingId, selectedPG);

        let reviewData = {
            listing: {
                id: selectedPG.listingId // Ensure listing ID is always passed
            },
            rating: rating,
            feedback: reviewText, // Use 'feedback' for backend
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            tenant: { // Include tenant object with ID
                id: Number(tenantId) // Ensure it's a number if your backend expects it
            }
        };

        try {
            if (isEditing) {
                // Update existing review
                reviewData.id = editingReviewId; // Ensure we send the correct review ID for update
                const updatedReview = await updateReview(reviewData);
                setReviews(prevReviews =>
                    prevReviews.map(review =>
                        review.id === editingReviewId
                            ? {
                                ...review,
                                rating: updatedReview.rating,
                                reviewText: updatedReview.feedback, // Update with feedback from response
                                date: updatedReview.createdAt,
                                checkInDate: updatedReview.checkInDate,
                                checkOutDate: updatedReview.checkOutDate,
                                status: 'published'
                            }
                            : review
                    )
                );
                setIsEditing(false);
                setEditingReviewId(null);
            } else {
                // Add new review
                reviewData.id = Date.now(); // Manually assign an ID for new reviews as required by backend
                const newReview = await addReview(reviewData);
                setReviews(prevReviews => [...prevReviews, {
                    id: newReview.id || reviewData.id, // Use the ID returned from the backend, fallback to client-generated
                    pgName: selectedPG.pgName,
                    location: selectedPG.location,
                    rating: newReview.rating,
                    date: newReview.createdAt, // Use the creation date from the backend
                    reviewText: newReview.feedback, // Use feedback from the backend response
                    status: "published",
                    thumbnail: selectedPG.url,
                    checkInDate: newReview.checkInDate,
                    checkOutDate: newReview.checkOutDate,
                    listingId: Number(selectedPG?.listingId),
                }]);

                // Remove from pending reviews based on listingId
                setPendingReviews(prevPending =>
                    prevPending.filter(pg => pg.listingId !== selectedPG.listingId)
                );

                console.log('New review added:', newReview);
            }

            setShowSuccessMessage(true);
            handleCloseForm(); // Close form and reset fields
            setTimeout(() => setShowSuccessMessage(false), 3000);
            // Re-fetch data to ensure all lists are up-to-date after submission/edit
            // fetchData(); // Call fetchData to refresh all lists - UNCOMMENT IF YOU WANT TO RE-FETCH ALL DATA
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review. Please try again.');
        }
    };

    const handleEditReview = (reviewId) => {
        const reviewToEdit = reviews.find(review => review.id === reviewId);
        if (reviewToEdit) {
            setIsEditing(true);
            setEditingReviewId(reviewId);
            setRating(reviewToEdit.rating);
            setReviewText(reviewToEdit.reviewText);
            setSelectedPG({ // Set the full PG object for editing context
                // Use review's listingId here for consistency with handleSubmitReview
                listingId: reviewToEdit.listingId,
                pgName: reviewToEdit.pgName,
                location: reviewToEdit.location,
                thumbnail: reviewToEdit.thumbnail,
            });
            setCheckInDate(reviewToEdit.checkInDate || '');
            setCheckOutDate(reviewToEdit.checkOutDate || '');
            setShowReviewForm(true);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                await deleteReviewById(reviewId);
                // Filter out the deleted review directly from the 'reviews' state
                setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
                setShowSuccessMessage(true); // Indicate success
                setTimeout(() => setShowSuccessMessage(false), 3000);
            } catch (error) {
                console.error('Error deleting review:', error);
                alert('Failed to delete review. Please try again.');
            }
        }
    };

    const handleCloseForm = () => {
        setShowReviewForm(false);
        setIsEditing(false);
        setEditingReviewId(null);
        setSelectedPG(null); // Reset to null
        setRating(0);
        setReviewText('');
        setHoveredRating(0);
        setCheckInDate('');
        setCheckOutDate('');
    };

    const handleWriteReviewFromPending = (pendingPg) => {
        setSelectedPG(pendingPg);
        setCheckInDate(pendingPg.checkInDate || '');
        setCheckOutDate(pendingPg.checkOutDate || '');
        setShowReviewForm(true);
        setIsEditing(false); // Ensure we are in "add new" mode
        setRating(0); // Reset rating for new review
        setReviewText(''); // Reset review text for new review
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
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            console.error("Invalid date string:", dateString);
            return dateString; // Return original if invalid
        }
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

            {/* Write Review Button (for general new review, if pending list is short/empty) */}
            {activeTab === 'pending' && pendingReviews.length === 0 && (
                <section className="write-review-section">
                    <button
                        className="write-review-btn"
                        onClick={() => { setShowReviewForm(true); setSelectedPG(null); setIsEditing(false); }}
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
                                    value={selectedPG?.listingId || ''} // Use listingId for value
                                    onChange={(e) => {
                                        const listingId = parseInt(e.target.value, 10);
                                        const pg = listings.find(p => p.id === listingId);
                                        if (pg) {
                                            setSelectedPG({
                                                pgName: pg.title,
                                                location: pg.address,
                                                thumbnail: pg.thumbnailUrl || 'https://via.placeholder.com/150',
                                                listingId: pg.id,
                                            });
                                        }
                                    }}
                                    disabled={isEditing} // Disable select when editing
                                >
                                    <option value="">Choose a PG to review</option>
                                    {listings.map(pg => (
                                        <option key={pg.id} value={pg.id}>
                                            {pg.title} - {pg.address}
                                        </option>
                                    ))}
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
                    {Array.isArray(filteredReviews) && filteredReviews.length > 0 ? (
                        filteredReviews.map((review) => (
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
                                            {review.reviewText}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="pending-review">
                                        <p>You haven't reviewed this PG yet.</p>
                                        <button
                                            className="write-review-btn small"
                                            onClick={() => handleWriteReviewFromPending(review)}
                                        >
                                            Write Review
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="no-reviews-message">
                            {activeTab === 'all' && "You don't have any reviews to display."}
                            {activeTab === 'published' && "You haven't published any reviews yet."}
                            {activeTab === 'pending' && "You don't have any pending stays to review."}
                        </p>
                    )}
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