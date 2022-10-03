import type { ComponentStyleConfig } from '@chakra-ui/theme';

export const Tag: ComponentStyleConfig = {
    variants: {
        subtle: {
            container: {
                bg: 'secondary',
                color: 'white',
            },
        },
    },
    defaultProps: {
        variant: 'bold',
    },
};
