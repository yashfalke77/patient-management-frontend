/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "@/components/ui/input";
import { FormFieldTypes } from "@/lib/enum";
import Image from "next/image";
import { E164Number } from "libphonenumber-js/core";
import { PhoneInput } from "./PhoneInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

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
            placeholder={props.placeHolder}
            type="password"
            autoComplete="off"
            className="shad-input border-0"
          />
        </div>
      );

    case FormFieldTypes.PHONE_INPUT:
      return (
        <PhoneInput
          defaultCountry="IN"
          placeholder={props.placeHolder}
          international
          autoComplete="off"
          value={field.value as E164Number | undefined}
          onChange={field.onChange}
        />
      );

    case FormFieldTypes.DATE_PICKER:
      return (
        <div className="flex items-center rounded-md border border-dark-500 bg-dark-400 px-2">
          <Image
            src="/icons/calendar.svg"
            height={20}
            width={20}
            alt="calendar"
            className="mr-2"
          />
          <DatePicker
            selected={field.value ? new Date(field.value) : null}
            onChange={(date: Date | null) => field.onChange(date)}
            dateFormat="dd/MM/yyyy"
            autoComplete="off"
            placeholderText="Select date"
            className="bg-transparent outline-none w-full text-white"
            wrapperClassName="date-picker"
          />
        </div>
      );

    case FormFieldTypes.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;

    case FormFieldTypes.SELECT:
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger className="shad-select-trigger">
            <SelectValue placeholder={props.placeHolder} />
          </SelectTrigger>
          <SelectContent className="shad-select-content">
            {props.children}
          </SelectContent>
        </Select>
      );

    case FormFieldTypes.TEXTAREA:
      return (
        <Textarea
          placeholder={props.placeHolder}
          {...field}
          className="shad-textArea"
          disabled={props.disabled}
        />
      );

    case FormFieldTypes.CHECKBOX:
      return (
        <div className="flex items-center gap-4">
          <Checkbox
            id={props.name}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
          <label htmlFor={props.name} className="checkbox-label">
            {props.label}
          </label>
        </div>
      );

    default:
      return null;
  }
};

function CustomFormField(props: CustomProps) {
  const { control, fieldType, label, name } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldTypes.CHECKBOX && label && (
            <FormLabel htmlFor={name}>{label}</FormLabel>
          )}

          <FormControl>
            <RenderField field={field} fieldState={fieldState} props={props} />
          </FormControl>

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
}

export default CustomFormField;