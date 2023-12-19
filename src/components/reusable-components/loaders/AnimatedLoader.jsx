import { AbsoluteCenter } from '@chakra-ui/react';
import { Oval } from 'react-loader-spinner';


export const AnimatedLoader = ({...rest}) => {
	return <OvalLoader {...rest} />;
};


export const OvalLoader = ({...rest}) => {
	return (
		<AbsoluteCenter {...rest}>
			<Oval height={80} width={80} color='#FFFFFF' wrapperStyle={{}} wrapperClass='' visible={true} ariaLabel='oval-loading' secondaryColor='#F5F5F5' strokeWidth={2} strokeWidthSecondary={2} />
		</AbsoluteCenter>
	);
};




