import React from 'react'
import { Button,Stack } from "@chakra-ui/react"
const Settings = () => {
    return (
          <div>
              
                    <Button
                        isLoading={true}
                        loadingText="Loading"
                        colorScheme="teal"
                        variant="outline"
                        spinnerPosition="start">
                    Loading
                </Button>
  
            
        </div>
    )
}

export default Settings
