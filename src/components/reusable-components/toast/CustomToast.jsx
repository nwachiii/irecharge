import {Box, Stack, Text, useToast} from '@chakra-ui/react';

export const ToastContent = ({title, description, background, ...rest}) => {
	const toastTextStyles = {
		textAlign: 'left',
		color: ' #FFFFFF',
		fontFamily: 'Syne',
		fontSize: '22px',
		fontStyle: 'normal',
		fontWeight: '700',
		lineHeight: 'normal',
		py: 1,
	};
	return (
		<Box px={5} py={2} w='420px' color='white' h='fit-content' borderRadius='md' bg={background || '#191919'} {...rest}>
			{title ? <Text {...toastTextStyles}>{rest.title}</Text> : null}
			<Text {...toastTextStyles} fontSize={rest.title ? '16px' : '20px'} fontWeight={'normal'} fontFamily={'Euclid Circular B'}>
				{description}
			</Text>
		</Box>
	);
};

export const CustomToast = ({...rest}) => {
	const toast = useToast();
	return toast({
		isClosable: true,
		duration: `${rest.duration || 4000}`,
		render: () => <ToastContent {...rest} />,
		position: `${rest.position || 'top-right'}`,
	});
};
