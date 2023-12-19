// app/providers.tsx
'use client';
import {CacheProvider} from '@chakra-ui/next-js';
import {CityProvider} from '@/context/CityContext';
import {ChakraProvider} from '@chakra-ui/react';
import {QueryClient, QueryClientProvider} from 'react-query';
import { app_theme } from '@/theme';
const queryClient = new QueryClient();

export function Providers({children}) {
	return (
		<CacheProvider>
			<ChakraProvider theme={app_theme}>
				<QueryClientProvider client={queryClient}>
					<CityProvider>{children}</CityProvider>
				</QueryClientProvider>
			</ChakraProvider>
		</CacheProvider>
	);
}
