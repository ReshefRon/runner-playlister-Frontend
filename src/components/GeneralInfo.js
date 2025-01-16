import React from 'react';

const GeneralInfo = ({ userName, age, gender, handleChange }) => {
  return (
    <div className="GeneralInfo">
      <div className="form-group">
        <label>User Name:</label>
        <input
          type="text"
          name="userName"
          value={userName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={age}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Gender:</label>
        <select name="gender" value={gender} onChange={handleChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
};

export default GeneralInfo;
