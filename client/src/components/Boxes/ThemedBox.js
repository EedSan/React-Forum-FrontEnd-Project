import {Box} from '@chakra-ui/react';

const ThemedBox = ({light = 'white.500', children, ...rest}) => {
    return (<Box backgroundColor={light}{...rest}>{children}</Box>);
}

export default ThemedBox;