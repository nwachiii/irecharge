import React from 'react';
import {VStack, Input as InputBase} from '@chakra-ui/react';
import {useSharedInputStyles} from '@/styles/useSharedInputStyles';

export const CustomInput = ({...restProps}) => {
	const inputCommonStyles = useSharedInputStyles();

	return (
		<VStack my={2} w='100%'>
			<InputBase w='full' color='#FFFFFF' as='input' {...restProps} {...inputCommonStyles} />
		</VStack>
	);
};

export default CustomInput;
