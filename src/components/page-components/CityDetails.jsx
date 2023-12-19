import {useState, useEffect, Fragment} from 'react';
import {useQuery} from 'react-query';
import {useCity} from '@/context/CityContext';
import {getWeather} from '@/services';
import {Button, Textarea, HStack, Stack, Text} from '@chakra-ui/react';
import {AnimatedLoader} from '../reusable-components/loaders/AnimatedLoader';

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
		<Stack position='relative'>
			<Text fontSize={'32px'} fontWeight={'500'}>
				City Details
			</Text>
			<HStack w='full' justify='space-between'>
				<Text>
					{selectedCity?.name}, {selectedCity?.countryName}
				</Text>
				<Fragment>{selectedCity?.isFavorite ? <Button onClick={handleRemoveFromFavorites}>Remove from Favorites</Button> : <Button onClick={handleAddToFavorites}>Add to Favorites</Button>}</Fragment>
			</HStack>
			{weatherData ? (
				<div>
					<p>Temperature: {weatherData?.current?.temperature}°C</p>
					<p>Weather: {weatherData?.current?.weather_descriptions[0]}</p>
				</div>
			) : (
				<div>
					<AnimatedLoader />
				</div>
			)}
			<div>
				{!!notes && <h3>Notes:</h3>}
				{ isEditing ? (
					<div>
						<Textarea value={notes} onChange={handleNotesChange} placeholder='Add notes...' />
						<div>
							<Button bg='#191919' color='#FFF' border='1px solid gray.500' onClick={handleSaveNotes}>
								Save
							</Button>
							<Button bg='transparent' color='gray.500' border='1px solid gray.500' onClick={handleCancelEdit}>
								Cancel
							</Button>
							<Button bg='red.500' color='#FFF' border='1px solid red.500' onClick={handleDeleteNotes}>
								Delete Notes
							</Button>
						</div>
					</div>
				) : (
					<div>
						<p>{notes}</p>
						<Button onClick={handleEditNotes}>{notes ? 'Edit Notes' : 'Add Notes'}</Button>
					</div>
				)}
			</div>
		</Stack>
	);
};

export default CityDetails;

// <CityDetails selectedCity={selectedCity} />
