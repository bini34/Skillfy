import React, { useState } from 'react';

const CourseSell = () => {
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [price, setPrice] = useState('93.00');
  const [tempPrice, setTempPrice] = useState(price);

  const handlePriceEdit = () => {
    if (isEditingPrice) {
      setPrice(tempPrice);
    }
    setIsEditingPrice(!isEditingPrice);
  };

  const cancelPriceEdit = () => {
    setTempPrice(price);
    setIsEditingPrice(false);
  };

  return (
    <div className="course-sell">
      <h2>Sell your course</h2>
      <div className="course-price">
        <p>Course price</p>
        {isEditingPrice ? (
          <>
            <input
              type="text"
              value={tempPrice}
              onChange={(e) => setTempPrice(e.target.value)}
            />
            <button onClick={handlePriceEdit}>Save</button>
            <button onClick={cancelPriceEdit}>Cancel</button>
          </>
        ) : (
          <>
            <span>${price}</span>
            <button onClick={handlePriceEdit}>Edit</button>
          </>
        )}
      </div>
    </div>
  );
};

export default CourseSell;
