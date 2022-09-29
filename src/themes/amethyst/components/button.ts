import type { ComponentStyleConfig } from '@chakra-ui/theme';

export const Button: ComponentStyleConfig = {
    baseStyle: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        borderRadius: 'base',
    },
    sizes: {
        sm: {
            fontSize: 'sm',
            px: 4,
            py: 3,
        },
        md: {
            fontSize: 'md',
            px: 6,
            py: 4,
        },
    },
    variants: {
        solid: {
            bg: 'primary',
            color: 'white',
            _hover: {
                bg: 'primary',
                filter: 'brightness(0.8)',
                _disabled: {
                    bg: 'primary',
                    filter: 'brightness(1)',
                },
            },
            _disabled: {
                opacity: 0.5,
            },
            borderRadius: '6px',
        },
    },
    defaultProps: {
        size: 'sm',
        variant: 'solid',
    },
};
