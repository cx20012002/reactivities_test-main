import {useController, UseControllerProps} from "react-hook-form";
import {FormField, Input, Label} from "semantic-ui-react";

type Props = UseControllerProps & {
    type?: string;
    placeholder: string;
}

function AppTextInput(props: Props) {
    const {fieldState, field} = useController({...props, defaultValue: ''})
    return (
        <FormField error={!!fieldState.error}>
            <Input
                {...props}
                {...field}
            />
            {fieldState.error && <Label basic color={'red'}>{fieldState.error.message}</Label>}
        </FormField>
    )
}

export default AppTextInput