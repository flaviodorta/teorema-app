import { Box, BoxProps, Image } from '@chakra-ui/react';

const Logo = (props: BoxProps) => {
  return (
    <Box {...props}>
      <Image alt='Teorema' src='/logo.svg' />
    </Box>
  );
};

export default Logo;
