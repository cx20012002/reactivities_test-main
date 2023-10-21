import {Button, Form, Label} from "semantic-ui-react";
import {FieldValues, useForm} from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput.tsx";
import {observer} from "mobx-react-lite";
import {useStore} from "../../app/stores/store.ts";
import {UserFormValues} from "../../app/models/user.ts";

function LoginForm() {
    const {handleSubmit, control, formState: {isSubmitting, isValid, errors}, setError, reset} = useForm<FieldValues>()
    const {userStore} = useStore()

    return (
        <Form onSubmit={handleSubmit(async (data: FieldValues) => {
            const user = data as UserFormValues;
            try {
                await userStore.login(user);
            } catch (error) {
                setError('loginError', {message: 'Invalid email or password'});
                reset();
            }
        })}>
            <AppTextInput name={'email'} placeholder={'Email'} control={control} rules={{required: true}}/>
            <AppTextInput name={'password'} type={'password'} placeholder={'Password'} control={control} rules={{required: true}}/>
            {errors.loginError && <Label basic color={'red'} style={{marginBottom:10}}><>{errors.loginError.message}</></Label>}
            <Button loading={isSubmitting} disabled={!isValid} positive type="submit" content="Login" fluid/>
        </Form>
    )
}

export default observer(LoginForm)