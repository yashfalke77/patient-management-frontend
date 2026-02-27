/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from "react";
import { Control, Controller } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FormFieldTypes } from "@/lib/enum";
import Image from "next/image";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldTypes;
  name: string;
  label?: string;
  placeHolder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: string;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({
  field,
  fieldState,
  props,
}: {
  field: any;
  fieldState: any;
  props: CustomProps;
}) => {
  switch (props.fieldType) {
    case FormFieldTypes.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              height={24}
              width={24}
              alt={props.iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <Input
            {...field}
            id="form-rhf-demo-title"
            aria-invalid={fieldState.invalid}
            placeholder={props.placeHolder}
            autoComplete="off"
            className="shad-input border-0"
          />
        </div>
      );

      case FormFieldTypes.PASSWORD:
        return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              height={24}
              width={24}
              alt={props.iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <Input
            {...field}
            id={props.name}
            aria-invalid={fieldState.invalid}
            placeholder={props.placeHolder}
            type="password"
            autoComplete="off"
            className="shad-input border-0"
          />
        </div>
      );
    
      default:
        break;
  }
};

function CustomFormField(props: CustomProps) {
  const { control, fieldType, label, name } = props;
  return (
    <FieldGroup>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="flex-1">
            {fieldType != FormFieldTypes.CHECKBOX && label && (
              <FieldLabel htmlFor={props.name}>{label}</FieldLabel>
            )}

            <RenderField field={field} fieldState={fieldState} props={props} />

            {fieldState.invalid && (
              <FieldError className="shad-error" errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
    </FieldGroup>
  );
}

export default CustomFormField;
