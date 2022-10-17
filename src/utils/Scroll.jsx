import React from 'react'
import { Box } from '@chakra-ui/react';

export const ScrollFunction = ({ children, minHeight, maxHeight, width }) => {

    return (
        <Box overflowY="auto" overflowX="auto" m={0.5}
            width={width ? width : 'full'}
            minHeight={minHeight ? minHeight : 'auto'}
            maxHeight={maxHeight ? maxHeight : 'auto'}
            sx={{
                "&::-webkit-scrollbar": {
                    height: "5px",
                    width: "5px",
                    borderRadius: "1px",
                    backgroundColor: `rgba(0, 0, 0, 0.05)`,
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "accent",
                },
            }}
        >
            {children}
        </Box>
    )
    
}
