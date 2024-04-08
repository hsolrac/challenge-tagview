import React from 'react'
import { Heading, Box, Text, Button } from '@chakra-ui/react'

function PageNotFound(){
    
  const style = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: '10%'
  }

  return(
    <>
      <Box style={style}>
        <Heading>404</Heading>
        <Text>Pagina não encontrada</Text>
      </Box>
      <Box style={style}>
        <Button as="a" href="/">Voltar para Home</Button>
      </Box>
    </>
  )
}

export default PageNotFound;
