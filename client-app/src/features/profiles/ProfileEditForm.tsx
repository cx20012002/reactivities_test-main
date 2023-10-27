import {observer} from "mobx-react-lite";
import {useStore} from "../../app/stores/store.ts";
import {Button, Form} from "semantic-ui-react";
import AppTextInput from "../../app/components/AppTextInput.tsx";
import AppTextArea from "../../app/components/AppTextArea.tsx";
import {FieldValues, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from 'yup';

type Props = {
    setEditMode: (editMode: boolean) => void;
}

function ProfileEditForm({setEditMode}: Props) {
    const {profileStore: {profile, updateProfile}} = useStore();
    const {handleSubmit, control, formState: {isValid, isSubmitting}} = useForm<FieldValues>({
        mode: 'all',
        resolver: yupResolver(Yup.object({
            displayName: Yup.string().required(),
        } as FieldValues)),
        defaultValues: {
            displayName: profile?.displayName,
            bio: profile?.bio
        }
    });

    async function onSubmit(value: FieldValues) {
        await updateProfile(value);
        setEditMode(false);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={'ui form'}>
            <AppTextInput name={'displayName'} placeholder={'Display Name'} control={control}/>
            <AppTextArea name={'bio'} placeholder={'Add your bio'} rows={3} control={control}/>
            <Button
                floated={'right'}
                positive
                type={'submit'}
                content={'Update profile'}
                loading={isSubmitting}
                disabled={!isValid || isSubmitting}
            />
        </Form>
    )
}

export default observer(ProfileEditForm)