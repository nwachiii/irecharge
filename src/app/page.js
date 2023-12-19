'use client';

import {Stack, Box} from '@chakra-ui/react';
import {CityDetails, CityList, Favorites, SearchCityForWeather} from '@/components';

export default function Home() {
	
	return (
		<Stack w='full' bg={'#191919'} color={'#FFFFFF'} minH='100vh' justify={'center'} align='center' mx='auto'>
			<Box w={{base: '400px', md: '900px'}} p='19px 23px' border='1px solid lightgray' borderRadius={'14px'}>
				<SearchCityForWeather />
				<Favorites />

				<CityList />
				{/* <CityDetails /> */}
			</Box>
		</Stack>
	);
}
