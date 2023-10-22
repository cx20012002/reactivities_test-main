import {Button, Form, Header, Message} from "semantic-ui-react";
import {FieldValues, useForm} from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput.tsx";
import {observer} from "mobx-react-lite";
import {useStore} from "../../app/stores/store.ts";
import {UserFormValues} from "../../app/models/user.ts";
import {useState} from "react";
import * as Yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";

function RegisterForm() {
    const [errors, setErrors] = useState<string[]>([])
    const {handleSubmit, control, formState: {isSubmitting, isValid}} = useForm<FieldValues>({
        mode: 'all',
        resolver: yupResolver(Yup.object({
            displayName: Yup.string().required('Display name is required'),
            username: Yup.string().required('Username is required'),
            email: Yup.string().required('Email is required').email(),
            password: Yup.string().required('Password is required').min(6)
        } as FieldValues))
    })

    const {userStore} = useStore()

    return (
        <Form onSubmit={handleSubmit(async (data: FieldValues) => {
            const user = data as UserFormValues;
            try {
                await userStore.register(user);
            } catch (error: any) {
                console.log(error)
                setErrors(error);
            }
        })}>
            <Header as='h2' content='Sign up to Reactivities' color='teal' textAlign='center'/>
            <AppTextInput name={'displayName'} placeholder={'Display Name'} control={control}/>
            <AppTextInput name={'username'} placeholder={'User Name'} control={control}/>
            <AppTextInput name={'email'} placeholder={'Email'} control={control}/>
            <AppTextInput name={'password'} type={'password'} placeholder={'Password'} control={control}/>
            {errors.length > 0 && <Message list={errors} color="red"/>}
            <Button loading={isSubmitting} disabled={!isValid} positive type="submit" content="Register" fluid/>
        </Form>
    )
}

export default observer(RegisterForm)