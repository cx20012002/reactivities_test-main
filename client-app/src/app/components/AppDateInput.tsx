import {useController, UseControllerProps} from "react-hook-form";
import {FormField, Label} from "semantic-ui-react";
import DatePicker, {ReactDatePickerProps} from "react-datepicker";

type Props = UseControllerProps & Partial<ReactDatePickerProps> &{
    placeholder: string;
    name: string;
}

function AppDateInput(props: Props) {
    const {fieldState, field} = useController({
        name: props.name!,
        control: props.control,
        defaultValue: ''
    })
    return (
        <FormField error={!!fieldState.error}>
            <DatePicker
                placeholderText={props.placeholder}
                {...props}
                {...field}
                selected={(field.value && new Date(field.value)) || null}
            />
            {fieldState.error && <Label basic color={'red'}>{fieldState.error.message}</Label>}
        </FormField>
    )
}

export default AppDateInput