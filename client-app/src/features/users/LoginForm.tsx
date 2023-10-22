import {Button, Form, Header, Label} from "semantic-ui-react";
import {FieldValues, useForm} from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput.tsx";
import {observer} from "mobx-react-lite";
import {useStore} from "../../app/stores/store.ts";
import {UserFormValues} from "../../app/models/user.ts";
import {useState} from "react";

function LoginForm() {
    const [error, setError] = useState<string | null>(null)
    const {handleSubmit, control, formState: {isSubmitting, isValid}} = useForm<FieldValues>({
        mode: 'all'
    })
    const {userStore} = useStore()

    return (
        <Form onSubmit={handleSubmit(async (data: FieldValues) => {
            const user = data as UserFormValues;
            try {
                await userStore.login(user);
            } catch (error) {
                setError('Invalid email or password');
            }
        })}>
            <Header as='h2' content='Login to Reactivities' color='teal' textAlign='center'/>
            <AppTextInput name={'email'} placeholder={'Email'} control={control} rules={{required: 'email is required'}}/>
            <AppTextInput name={'password'} type={'password'} placeholder={'Password'} control={control} rules={{required: 'password is required'}}/>
            {error && <Label basic color={'red'} content={error}/>}
            <Button loading={isSubmitting} disabled={!isValid} positive type="submit" content="Login" fluid/>
        </Form>
    )
}

export default observer(LoginForm)