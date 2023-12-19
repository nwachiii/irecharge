'use client';

import {app_theme} from '@/theme';
import {Providers} from './providers';
import {ChakraProvider} from '@chakra-ui/react';

export default function RootLayout({children}) {
	return (
		<html lang='en' className={app_theme.fonts}>
			<body>
				<ChakraProvider theme={app_theme}>
					<Providers>
						{children}
					</Providers>
				</ChakraProvider>
			</body>
		</html>
	);
}
