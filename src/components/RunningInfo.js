
import React from 'react';

const RunningInfo = ({ distance, time, pace, handleChange }) => {
  return (
    <div className="RunningInfo">
      <div className="form-group">
        <label>Distance (KM):</label>
        <input
          type="number"
          name="distance"
          value={distance}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Time (Minutes):</label>
        <input
          type="number"
          name="time"
          value={time}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Pace (BPM):</label>
        <span>{pace}</span>
      </div>
    </div>
  );
};

export default RunningInfo;
