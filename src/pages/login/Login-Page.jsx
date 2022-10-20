import React from 'react';
import CryptoJS from 'crypto-js';
import { Box, Button, Flex, Image, Input, Text, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { saltkey } from '../../@features/saltkey';
import { loginSchema, useLoginApi } from './login.api.services';
import { BasicToast } from '../../utils/Toast';

const LoginPage = () => {

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(loginSchema),
        mode: "onChange"
    })

    const { mutate: loginUser, isLoading } = useLoginApi()
    const submitHandler = async (submitData) => {
        loginUser(submitData, {
            onSuccess: (res) => {
                BasicToast('top-end', 'success', `Welcome ${res.data.fullName}`, 1000)
                    .then(() => {
                        navigate("/")
                        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(res.data), saltkey).toString()
                        sessionStorage.setItem('userData', ciphertext)
                        window.location.reload(false)
                    })
            },
            onError: (err) => {
                BasicToast('top-end', 'error', err.response.data.message, 1000)
            }
        })
    }

    return (

        <Flex bgGradient="linear(to-l, secondary, primary)" h='100vh' justifyContent='center' alignItems='center'>
            <form onSubmit={handleSubmit(submitHandler)}>
                <VStack spacing={2} bgColor='gray.600' pl={10} pr={10} pt={4} pb={3} rounded={6}>
                    <Image width='200px' src='/images/umelixirlogo.png' />
                    <Box>
                        <Input variant='filled' size='sm' autoComplete='off' placeholder='Username' {...register("userName")} />
                        <Text color="danger" fontSize='xs' mt={1}>{errors.userName?.message}</Text>
                    </Box>
                    <Box>
                        <Input variant='filled' size='sm' autoComplete='off' placeholder='Password' type='password' {...register("password")} />
                        <Text color="danger" fontSize='xs' mt={1}>{errors.password?.message}</Text>
                    </Box>
                    <Button width='full' bgColor='#18b58f' size='sm' type='sumbit' disabled={!isValid} isLoading={isLoading}>
                        Login
                    </Button>
                    <Text color='gray.300' fontSize='10px'>© 2022, UM-Elixir Powered by MIS</Text>
                </VStack>
            </form>
        </Flex>

    )
}

export default LoginPage;