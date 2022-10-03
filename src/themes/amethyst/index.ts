import { Alert } from './components/alert';
import { Tag } from './components/tag';
import { Button } from './components/button';
import { extendTheme } from '@chakra-ui/react';

export const amethyst = extendTheme({
    colors: {
        primary: '#5D5FEF',
        secondary: '#319795',
    },
    components: {
        Button,
        Tag,
        Alert,
    },
});
