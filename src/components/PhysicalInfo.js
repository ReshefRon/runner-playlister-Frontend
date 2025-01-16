import React from 'react';

const PhysicalInfo = ({ weight, height, bmi, handleChange }) => {
  return (
    <div className="PhysicalInfo">
      <div className="form-group">
        <label>Weight (KG):</label>
        <input
          type="number"
          name="weight"
          value={weight}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Height (CM):</label>
        <input
          type="number"
          name="height"
          value={height}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>BMI:</label>
        <span>{bmi}</span>
      </div>
    </div>
  );
};

export default PhysicalInfo;
