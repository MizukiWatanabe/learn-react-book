import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: 'orange.50',
        color: 'gray.800',
      },
      p: {
        fontSize: { base: 'md', md: 'lg' },
        lineHeight: 'tall', // tall = 1.5
      },
    },
  },
});

export default theme;
