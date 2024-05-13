import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [homeTeamImage, setHomeTeamImage] = useState(null);
  const [awayTeamImage, setAwayTeamImage] = useState(null);

  const handleGeneratePassMap = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/generate_pass_map', {
        home_team: homeTeam,
        away_team: awayTeam
      });
      setHomeTeamImage(response.data.home_team_image);
      setAwayTeamImage(response.data.away_team_image);
    } catch (error) {
      console.error('Error fetching pass maps:', error);
      alert('Failed to fetch pass maps. Check the console for more information.');
    }
  };

  return (
    <div>
      <h1>2022 World Cup Pass Networks</h1>
      <div className = 'input-group'>
      <input
        type="text"
        placeholder="Enter Home Team"
        value={homeTeam}
        onChange={e => setHomeTeam(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Away Team"
        value={awayTeam}
        onChange={e => setAwayTeam(e.target.value)}
      />
      </div>
      <button onClick={handleGeneratePassMap}>Generate Pass Maps</button>
      <div className = 'image-container'>
      {homeTeamImage && (
        <div>
          <img src={`data:image/png;base64,${homeTeamImage}`} alt="Home Team Pass Map" />
        </div>
      )}
      {awayTeamImage && (
        <div>
          <img src={`data:image/png;base64,${awayTeamImage}`} alt="Away Team Pass Map" />
        </div>
      )}
      </div>
    </div>
  );
}

export default App;


