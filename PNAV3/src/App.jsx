import React, { useState } from 'react';
import axios from 'axios';

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
      <h1>Football Pass Maps</h1>
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
      <button onClick={handleGeneratePassMap}>Generate Pass Maps</button>
      
      {homeTeamImage && (
        <div>
          <h2>Home Team Pass Map</h2>
          <img src={`data:image/png;base64,${homeTeamImage}`} alt="Home Team Pass Map" />
        </div>
      )}
      {awayTeamImage && (
        <div>
          <h2>Away Team Pass Map</h2>
          <img src={`data:image/png;base64,${awayTeamImage}`} alt="Away Team Pass Map" />
        </div>
      )}
    </div>
  );
}

export default App;


