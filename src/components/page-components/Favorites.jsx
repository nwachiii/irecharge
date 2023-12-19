import {useQuery} from 'react-query';
import {useCity} from '@/context/CityContext';
import {getWeather} from '@/services';
import {DeleteIcon} from '@chakra-ui/icons';
import {Box, Button, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, Text, Stack, HStack, DrawerHeader, DrawerBody, DrawerFooter} from '@chakra-ui/react';
import React from 'react';
import {EmptyState} from '../reusable-components/empty-data/EmptyDataComponent';

export const Favorites = () => {
	const {favorites, removeFromFavorites} = useCity();
	const {isOpen, onOpen, onClose} = useDisclosure();
	const btnRef = React.useRef();

	return (
		<div>
			<Button my='15px' ref={btnRef} onClick={onOpen} colorScheme='facebook' leftIcon={<Box>({favorites?.length})</Box>}>
				Favorites
			</Button>
			<Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef} w='320px'>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Favorites</DrawerHeader>

					<DrawerBody>
						<Stack spacing='15px'>
							{favorites?.length > 0 ? (
								favorites?.map((city) => (
									<Box p='12px 15px' key={city.geonameId} w='full' border='1px solid lightgray' color='#191919' borderRadius={'14px'} bg='#F5F5F5'>
										<HStack w='full' justify='space-between'>
											<Text w='full'>
												{city.name}, {city.countryName}
											</Text>
											<DeleteIcon cursor={'pointer'} color='red.500' onClick={() => removeFromFavorites(city)}>
												Remove
											</DeleteIcon>
										</HStack>
										<div key={city.geonameId}>
											<WeatherInfo city={city} />
										</div>
									</Box>
								))
							) : (
								<EmptyState />
							)}
						</Stack>
					</DrawerBody>

					<DrawerFooter>
						<Button variant='outline' mr={3} onClick={onClose}>
							Cancel
						</Button>
						<Box />
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</div>
	);
};

// WeatherInfo component to fetch and display weather data
function WeatherInfo({city}) {
	const {data: weather} = useQuery(['weather', city?.name], () => getWeather(city?.name));

	if (!weather) {
		return <div>Loading weather data...</div>;
	}

	return (
		<Box>
			<p>Temperature: {weather?.current?.temperature}°C</p>
			<p>Weather: {weather?.current?.weather_descriptions?.[0]}</p>
		</Box>
	);
}

export default Favorites;
