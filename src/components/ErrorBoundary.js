import React from "react";
import { Box, Text, Heading, Button } from "@chakra-ui/react";

class ErrorBoundary extends React.Component {
    constructor( props ) {
        super( props );
        this.state = { hasError : false };
    }

    static getDerivedStateFromError( error ) {
        //update state so that the next render shows the fallback UI
        return { hasError : true };
    }

    //log error
    componentDidCatch(error, errorInfo) {
        console.error('Error Boundary caught an error:', error, errorInfo);
    }

    //reset error boundary to initial state
    handleReset() { this.setState({ hasError : false }); }

    render() {
        if ( this.state.hasError ) {
            return (
                <Box>
                    <Heading as="hi" size="lg" mb="4">
                        Something went wrong
                    </Heading>
                    <Text mb="4">An error occured. Please try again</Text>
                    <Button onClick={ this.handleReset } colorScheme="blue">Try Again</Button>
                </Box>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;