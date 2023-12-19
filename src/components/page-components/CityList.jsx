import {useCity} from '@/context/CityContext';
import {getLargestCities} from '@/services';
import {useQuery} from 'react-query';
import {Text, TableContainer, Table, Button, Thead, Th, Tr, Td, Tbody} from '@chakra-ui/react';
import {AnimatedLoader} from '../reusable-components/loaders/AnimatedLoader';
import {CustomToast} from '../reusable-components/toast';

export const CityList = () => {
	const {addToFavorites} = useCity();
	const {data: cities, isLoading, isError} = useQuery('largestCities', getLargestCities);

	const sortedCities = cities?.sort((a, b) => a.name.localeCompare(b.name));

	console.log('sortedCities', sortedCities);

	return (
		<div>
			<TableContainer>
				<Table variant='simple' minH='500px'>
					<Thead>
						<Tr>
							<Th>S/N</Th>
							<Th>City</Th>
							<Th>Country</Th>
							<Th>Population</Th>
							<Th>Add to Favorite</Th>
							<Th></Th>
						</Tr>
					</Thead>
					<Tbody>
						{isLoading ? (
							<AnimatedLoader />
						) : isError ? (
							<CustomToast title='An error occured' description={'City not found. Please check the city name and try again.'} />
						) : (
							sortedCities?.map((city, indx) => (
								<Tr key={indx}>
									<Td>{indx + 1}</Td>
									<Td>
										<Text fontSize={'14px'} key={city.geonameId}>
											{city.name}
										</Text>
									</Td>
									<Td>
										<Text fontSize={'14px'} key={city.geonameId}>
											{city.countryName}
										</Text>
									</Td>
									<Td>
										<Text fontSize={'14px'} key={city.geonameId}>
											{city.population}
										</Text>
									</Td>
									<Td>
										<Button bg='transparent' border='1px solid lightgray' color='#FFFFFF' borderRadius={'14px'} onClick={() => addToFavorites(city)}>
											Add to Favorites
										</Button>
									</Td>
									<Td>
										<Button w="120px" borderRadius={'12px'} onClick={() => addToFavorites(city)}>
											View
										</Button>
									</Td>
								</Tr>
							))
						)}
					</Tbody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default CityList;
