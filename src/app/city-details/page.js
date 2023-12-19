'use client';

import {CityDetails, Favorites} from '@/components';
import {AnimatedLoader} from '@/components/reusable-components/loaders/AnimatedLoader';
import {getLargestCities} from '@/services';
import {useQuery} from 'react-query';
import {AbsoluteCenter, Stack, Box} from '@chakra-ui/react';
import {useSearchParams} from 'next/navigation';
import {ArrowLeftIcon} from '@chakra-ui/icons';
import {EmptyState} from '@/components/reusable-components/empty-data/EmptyDataComponent';
import Link from 'next/link';

const MoreDetailsonWeatherPerCity = () => {
	const searchParams = useSearchParams();
	const {data: cities, isLoading, isError} = useQuery('largestCities', getLargestCities);
	const CITY_ID = searchParams.get('pageId');

	if (isLoading) {
		<AnimatedLoader />;
	}

	const SELECTED_CITY = cities?.filter((item) => item?.geonameId == CITY_ID)?.[0];

	// console.log('CITY_ID', SELECTED_CITY);
	return (
		<Stack w='full' bg={'#191919'} color={'#FFFFFF'} minH='100vh' justify={'center'} align='center' mx='auto'>
			<Link href='/'>
				<ArrowLeftIcon position="absolute" left="4rem" cursor={'pointer'} boxSize='50px' />
			</Link>
			<Box w={{base: '400px', md: '900px'}} p='19px 23px' border='1px solid lightgray' borderRadius={'14px'} minH='200px' h='fit-content'>
				{isLoading ? (
					<AnimatedLoader />
				) : SELECTED_CITY == null ? (
					<AbsoluteCenter mt='20rem'>
						<EmptyState title={'No valid selected city'} description='No details found' />
					</AbsoluteCenter>
				) : (
					<CityDetails selectedCity={SELECTED_CITY} />
				)}
			</Box>
		</Stack>
	);
};

export default MoreDetailsonWeatherPerCity;
