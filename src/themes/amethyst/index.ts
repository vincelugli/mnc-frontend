import { Button } from './components/button';
import { extendTheme } from '@chakra-ui/react';

export const amethystTheme = extendTheme({
    colors: {
        primary: '#5D5FEF',
        secondary: '#319795',
    },
    components: {
        Button,
    },
});
