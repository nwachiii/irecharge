// import {useColorModeValue, useToken} from '@chakra-ui/react';

export const useSharedInputStyles = () => {
	// This would make the return value shareable across non chakra UIs
	// const [gray400, whiteAlpha400] = useToken('colors', ['gray.400', 'whiteAlpha.400']);

	// const borderColor = useColorModeValue(gray400, whiteAlpha400)
	// const color = useColorModeValue('#3F3D56', 'rgb(201, 209, 217)');
	// const placeholderColor = useColorModeValue(gray400, whiteAlpha400);

	return {
		fontSize: '1rem',
		transition: '0.3s ease-in-out',
		color: `#FFFFFF`,
		px: 4,
		py: `4`,
		h: '55px',
		outline: 'none',
		borderRadius: '14px',
		focusBorderColor: 'none',
		_placeholder: {
			fontSize: '14px',
			color: `#FFFFFF`,
		},
		_focus: {
			borderColor: 'grey',
		},
		_active: {
			borderColor: 'grey',
		},
		_visited: {
			borderColor: 'grey',
		},
	};
};
