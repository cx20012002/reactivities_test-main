import {Button, Form, Header, Segment} from "semantic-ui-react";
import {useEffect} from "react";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Activity} from "../../../app/models/activity.ts";
import LoadingComponent from "../../../app/layout/LoadingComponent.tsx";
import {v4 as uuid} from "uuid";
import {FieldValues, useForm} from "react-hook-form";
import AppTextInput from "../../../app/components/AppTextInput.tsx";
import AppTextArea from "../../../app/components/AppTextArea.tsx";
import * as Yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import AppSelectInput from "../../../app/components/AppSelectInput.tsx";
import {categoryOptions} from "../../../app/common/categoryOptions.ts";
import AppDateInput from "../../../app/components/AppDateInput.tsx";

function ActivityForm() {
    const {activityStore} = useStore();
    const {createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {handleSubmit, reset, formState: {isValid}, control, getValues} = useForm<FieldValues>({
        mode: 'all',
        resolver: yupResolver(Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
            category: Yup.string().required('Category is required'),
            date: Yup.string().required('Date is required'),
            city: Yup.string().required('City is required'),
            venue: Yup.string().required('Venue is required')
        } as FieldValues))
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => {
            reset(activity);
        });

    }, [id, loadActivity, reset]);

    function onSubmit() {
        const activity = getValues() as Activity;
        if (!activity.id) {
            let newActivity = {...activity, id: uuid()};
            createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`));
        } else {
            updateActivity({...activity, date: new Date(activity.date)}).then(() => navigate(`/activities/${activity.id}`));
        }
    }

    if (loadingInitial) return <LoadingComponent content={'Loading activity...'}/>

    return (
        <Segment clearing>
            <Header content={'Activity Details'} sub color={'teal'}/>
            <Form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
                <AppTextInput name={'title'} type={'text'} placeholder={'Title'} control={control}/>
                <AppTextArea name={'description'} placeholder={'Description'} control={control}/>
                <AppSelectInput name={'category'} options={categoryOptions} placeholder={'Category'} control={control}/>
                <Header content={'Location Details'} sub color={'teal'}/>
                <AppDateInput name={'date'} placeholder={'Date'} control={control} showTimeSelect timeCaption='time' dateFormat='MMMM d, yyyy h:mm aa'/>
                <AppTextInput name={'city'} type={'text'} placeholder={'City'} control={control}/>
                <AppTextInput name={'venue'} type={'text'} placeholder={'Venue'} control={control}/>
                <Button loading={loading} disabled={!isValid} floated="right" positive type="submit" content="Submit"/>
                <Button as={Link} to={'/activities'} floated="right" type="button" content="Cancel"/>
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm);