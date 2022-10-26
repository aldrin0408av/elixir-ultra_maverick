import { extendTheme, withDefaultVariant } from '@chakra-ui/react'

const theme = extendTheme({
    // colors: {
    //     primary: "#27273A",
    //     secondary: "#33334C",
    //     accent: "#87CEAA",
    //     warning: "#eed202",
    //     success: "#48bb78",
    //     danger: "#f56565",
    //     table_accent: "#daf5ee"
    // },
    colors: {
        primary: "#023246",
        secondary: "#032539",
        accent: "#1c768f",
        warning: "#eed202",
        success: "#48bb78",
        danger: "#f56565",
        table_accent: "#daf5ee",
        myWhite: "#e5e5e5"
    },
    components: {
        Input: {
            baseStyle: {
                borderRadius: "none",
            },
            variants: {
                filled: {
                    field: {
                        borderColor: "accent",
                        borderRadius: "none",
                        _focus: {
                            borderColor: "myWhite",
                            color: '#27273A'
                        },
                        _active: {
                            borderColor: "myWhite",
                            color: '#27273A'
                        },
                        _hover: {
                            borderColor: "#27273A",
                        }
                    },
                },
                outline: {
                    field: {
                        borderColor: "accent",
                        borderRadius: "none",
                        _focus: {
                            borderColor: "myWhite",
                            color: '#27273A'
                        },
                        _active: {
                            borderColor: "myWhite",
                            color: '#27273A'
                        },
                        _hover: {
                            borderColor: "#27273A",
                        }
                    },
                },
            },
        },
        Button: {
            baseStyle: {
                borderRadius: "none",
                borderColor: "accent",
            },
        },
        Select: {
            variants: {
                outline: {
                    field: {
                        borderRadius: "1px",
                        borderColor: "accent",
                        _focus: {
                            borderColor: "accent",
                        },
                        _active: {
                            borderColor: "accent",
                        },
                        _hover: {
                            borderColor: "accent",
                        }
                    },
                },
            },

        },
    },

}, withDefaultVariant({
    variant: "outline",
    components: ["Input", "Select"],
}))

// const [successToast, errorToast] = createStandaloneToast()

// successToast({
//     title: "Login Successful",
//     description: "Welcome",
//     status: 'success',
//     position: 'top-right',
//     duration: 4000,
//     isClosable: true,
// })

// errorToast({
//     title: "Invalid Credentials",
//     description: "Please try again",
//     status: 'error',
//     position: 'top-right',
//     duration: 4000,
//     isClosable: true,
// })

export default theme