import React, {  useState, useEffect } from 'react';

function DevForm({ onSubmit }) {

    const [github_username,  setGithubUsername]  = useState('');
    const [techs, setTechs] = useState('');
    const [latitude,  setlatitude]  = useState('');
    const [longitude, setlongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
    
            setlatitude(latitude);
            setlongitude(longitude);
    
          },
          (err) => {
            console.log(err);
          },
          {
            timeout:3000,
          }
        )
      },[]);

      async function handleAddDev(e) {
        e.preventDefault();

        await onSubmit({
          github_username,
          techs,
          latitude,
          longitude, 
        });

        setGithubUsername('');
        setTechs('');

      }

    return (
        <form onSubmit={handleAddDev}>
        <div className="input-block">
          <label htmlFor="github_username">Usuário do Github</label>
          <input name="github_username" id="github_username" required value={github_username} 
          onChange={ e => setGithubUsername(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input name="techs" id="techs" required value={techs} 
          onChange={ e => setTechs(e.target.value)}
          />
        </div>

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input type="number" name="latitude" id="latitude" required value={latitude} 
            onChange={ e => setlatitude(e.target.value)}
            />
          </div>
        </div>

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input type="number" name="longitude" id="longitude" required value={longitude} 
            onChange={ e => setlongitude(e.target.value)}
            />
          </div>
        </div>

        <button type="submit">Salvar</button>
      </form>
    )
}

export default DevForm;