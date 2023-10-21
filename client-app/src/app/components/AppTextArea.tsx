import {useController, UseControllerProps} from "react-hook-form";
import {FormField, Label, TextArea} from "semantic-ui-react";

type Props = UseControllerProps & {
    rows?: number;
    placeholder: string;
}

function AppTextInput(props: Props) {
    const {fieldState, field} = useController({...props, defaultValue: ''})
    return (
        <FormField error={!!fieldState.error}>
            <TextArea
                {...props}
                {...field}
            />
            {fieldState.error && <Label basic color={'red'}>{fieldState.error.message}</Label>}
        </FormField>

    )
}

export default AppTextInput