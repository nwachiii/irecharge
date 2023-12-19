import {useState, useEffect} from 'react';
import {useQuery} from 'react-query';
import {useCity} from '@/context/CityContext';
import {getWeather} from '@/services';

export const CityDetails = ({selectedCity}) => {
	const {addToFavorites, removeFromFavorites} = useCity();
	const [notes, setNotes] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const savedNotesKey = `notes_${selectedCity?.name}`;

	useEffect(() => {
		// Load notes from local storage if available
		const savedNotes = localStorage.getItem(savedNotesKey);
		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, [savedNotesKey]);

	const handleAddToFavorites = () => {
		addToFavorites(selectedCity);
	};

	const handleRemoveFromFavorites = () => {
		removeFromFavorites(selectedCity);
	};

	const handleNotesChange = (event) => {
		setNotes(event.target.value);
	};

	const handleSaveNotes = () => {
		// Save notes to local storage
		localStorage.setItem(savedNotesKey, notes);
		setIsEditing(false);
	};

	const handleEditNotes = () => {
		setIsEditing(true);
	};

	const handleCancelEdit = () => {
		// Reset notes to the previously saved value
		const savedNotes = localStorage.getItem(savedNotesKey);
		if (savedNotes) {
			setNotes(savedNotes);
		}
		setIsEditing(false);
	};

	const handleDeleteNotes = () => {
		// Delete notes from local storage
		localStorage.removeItem(savedNotesKey);
		setNotes('');
	};

	const {data: weatherData} = useQuery(['weather', selectedCity?.name], () => getWeather(selectedCity?.name));

	return (
		<div>
			<h2>City Details</h2>
			<h3>
				{selectedCity?.name}, {selectedCity?.countryName}
				{selectedCity?.isFavorite ? <button onClick={handleRemoveFromFavorites}>Remove from Favorites</button> : <button onClick={handleAddToFavorites}>Add to Favorites</button>}
			</h3>
			{weatherData ? (
				<div>
					<p>Temperature: {weatherData?.current?.temperature}°C</p>
					<p>Weather: {weatherData?.current?.weather_descriptions[0]}</p>
				</div>
			) : (
				<div>Loading weather data...</div>
			)}
			<div>
				<h3>Notes:</h3>
				{isEditing ? (
					<div>
						<textarea value={notes} onChange={handleNotesChange} placeholder='Add notes...' />
						<div>
							<button onClick={handleSaveNotes}>Save</button>
							<button onClick={handleCancelEdit}>Cancel</button>
							<button onClick={handleDeleteNotes}>Delete Notes</button>
						</div>
					</div>
				) : (
					<div>
						<p>{notes}</p>
						<button onClick={handleEditNotes}>Edit Notes</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default CityDetails;

// <CityDetails selectedCity={selectedCity} />
