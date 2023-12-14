import { app_theme } from '@/theme';
import {Providers} from './providers';

export default function RootLayout({children}) {
	return (
		<html lang='en' className={app_theme.fonts}>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
