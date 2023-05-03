'use client'

import axios from "axios"
import { AiFillFacebook, AiOutlineMail } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { BsApple } from 'react-icons/bs'

import { useCallback, useState } from "react"
import {
    SubmitHandler,
    useForm,
    FieldValues,
} from 'react-hook-form'
import useRegisterModal from "@/app/hooks/useRegisterModal"
import Modal from "./Modal"
import Input from "../inputs/Input"
import { log } from "console"
import { toast } from 'react-hot-toast';
import Button from "../Button"
import {BsGithub} from 'react-icons/bs'
import { signIn } from "next-auth/react"
import useLoginModal from "@/app/hooks/useLoginModal"

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })
    const handleClose = useCallback(() => {
        clearErrors();
        setTimeout(() => {
            registerModal.onClose();
        }, 300)
    }, [registerModal.onClose]);

    const onToggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal]);

    // const onSubmit: SubmitHandler<FieldValues> = (data) => {
    //     setIsLoading(true);

    //     axios.post('/api/register', data)
    //         .then(() => {
    //             toast.success('Registered!');
    //             registerModal.onClose();
    //             //   loginModal.onOpen();
    //         })
    //         .catch((error) => {  
    //             console.log(error)
    //             toast.error('Something went wrong!');
    //         })
    //         .finally(() => {
    //             setIsLoading(false);
    //         })

    // }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        setIsLoading(true);

        const res = axios.post('/api/register', data);
        const error = (await res).data.error;

        if(!error){
            toast.success('Registered!');
            registerModal.onClose();
            //   loginModal.onOpen();
        }else {
            if(error.code === 'P2002'){
                toast.error('email already registered!');
            }else {
                toast.error('Something went wrong!');
            }
            
        }
       
        setIsLoading(false);
    }

    const bodyContent = (
        <div className="flex flex-col gap-2">
            <div className="text-2xl ">Welcome to Airbnb</div>
            <Input
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='password'
                label='Password'
                disabled={isLoading}
                register={register}
                errors={errors}
                type='password'
                required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-2 mt-2">
            <div className="flex flex-row items-center ">
                <div className="border-t-[1px] border-gray-400 h-[1px] w-5/12"> </div>
                <div className="w-1/6 text-center">or</div>
                <div className="border-t-[1px] border-gray-400  h-[1px] w-5/12"> </div>
            </div>


            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => { }}
            />
            <Button
                outline
                label='Continue with Github'
                icon={BsGithub}
                onClick={() => signIn('github')}
            />
            {/* <Button
                outline
                label='Continue with Facebook'
                icon={AiFillFacebook}
                iconColor='#4267B2'
                onClick={() => { }}
            />
            <Button
                outline
                label='Continue with Apple'
                icon={BsApple}
                onClick={() => { }}
            /> */}
       

            <Button
                outline
                label='Continue with Email'
                icon={AiOutlineMail}
                onClick={() => { }}
            />
            <div className="text-xs text-gray-500 flex flex-row gap-1 mt-2 justify-center">
                <div>Already have an account?</div>
                <div
                    onClick={onToggle}
                    className="
                        hover:underline
                        cursor-pointer
                         text-neutral-900
                    ">Log in</div>
            </div>

        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title='Register'
            actionLabel='Continue'
            onClose={handleClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )

}

export default RegisterModal                 