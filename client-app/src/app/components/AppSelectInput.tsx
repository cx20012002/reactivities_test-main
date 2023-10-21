import {useController, UseControllerProps} from "react-hook-form";
import {FormField, Label, Select} from "semantic-ui-react";

type Props = UseControllerProps & {
    placeholder: string;
    options: { text: string, value: string }[];
    name: string;
    label?: string;
}

function AppSelectInput(props: Props) {
    const {fieldState, field} = useController({...props, defaultValue: ''})
    return (
        <FormField error={!!fieldState.error}>
            <Select
                clearable
                options={props.options}
                value={field.value || null}
                onChange={(_, data) => field.onChange(data.value)}
                onBlur={field.onBlur}
                placeholder={props.placeholder}
            />
            {fieldState.error && <Label basic color={'red'}>{fieldState.error.message}</Label>}
        </FormField>
    )
}

export default AppSelectInput