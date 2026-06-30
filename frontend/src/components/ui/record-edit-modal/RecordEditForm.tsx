import { useState } from 'react';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { useUppyState } from '@uppy/react';
import { revalidateLogic } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { useAppForm } from './form-context';
import { recordSchema } from '@/schemas/person';
import type { FullPerson } from '@/types/types';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { FileUploader } from './FileUploader';
import type { UploadedFile } from './FileUploader';
import { API_ENDPOINTS } from '@/components/ui/utils/endpoints';

type StatusValue = FullPerson['status'];

const STATUS_OPTIONS: StatusValue[] = ['bronze', 'silver', 'gold', 'do not contact'];

type RecordEditFormProps = {
  person: FullPerson;
  onSuccess: () => void;
};

function getOnDynamicError(fieldErrorMap: Record<string, unknown>): string | undefined {
  const dynamicErrors = fieldErrorMap['onDynamic'];
  if (!Array.isArray(dynamicErrors) || dynamicErrors.length === 0) return undefined;
  const firstError: unknown = dynamicErrors[0];
  if (typeof firstError === 'string') return firstError;
  if (firstError !== null && typeof firstError === 'object' && 'message' in firstError) {
    return String(firstError.message);
  }
  return undefined;
}

function dateToInputValue(date: Date | string | undefined): string {
  if (!date) return '';
  const dateObject = date instanceof Date ? date : new Date(date);
  return isNaN(dateObject.getTime()) ? '' : dateObject.toISOString().split('T')[0];
}

export function RecordEditForm({ person, onSuccess }: RecordEditFormProps) {
  const [uppy] = useState(() =>
    new Uppy({
      id: `record-uploader-${person.id}`,
      autoProceed: false,
      restrictions: { maxFileSize: 50 * 1024 * 1024 },
    }).use(XHRUpload, { endpoint: 'https://httpbin.org/post' }),
  );

  const fileCount = useUppyState(uppy, (state) => Object.keys(state.files).length);

  const mutation = useMutation({
    mutationFn: async (payload: {
      name: string;
      address: string;
      postcode: string;
      notes: string;
      nextTask: string;
      taskDeadline: Date | undefined;
      status2: string;
      uploadedFiles: UploadedFile[];
    }) => {
      const res = await fetch(`${API_ENDPOINTS.people}/${person.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          taskDeadline: payload.taskDeadline?.toISOString() ?? null,
        }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      return res.json() as Promise<FullPerson>;
    },
    onSuccess: () => onSuccess(),
  });

  const form = useAppForm({
    defaultValues: {
      name: person.name,
      address: person.address ?? '',
      postcode: person.postcode ?? '',
      notes: person.notes ?? '',
      nextTask: person.nextTask ?? '',
      taskDeadline: person.taskDeadline ? new Date(person.taskDeadline as unknown as string) : undefined,
      status2: person.status2 ?? '',
    },
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'change',
    }),
    validators: { onDynamic: recordSchema },
    onSubmit: async ({ value }) => {
      let uploadedFiles: UploadedFile[] = [];
      if (uppy.getFiles().length > 0) {
        const result = await uppy.upload();
        if (!result || (result.failed?.length ?? 0) > 0) return;
        uploadedFiles = (result.successful ?? []).map((uploadedFile) => ({
          uploadURL: uploadedFile.uploadURL ?? '',
          fileName: uploadedFile.name,
          fileType: uploadedFile.type ?? '',
          fileSize: uploadedFile.size ?? 0,
        }));
      }
      try {
        await mutation.mutateAsync({ ...value, uploadedFiles });
      } catch {
        // error state available via mutation.isError / mutation.error
      }
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
      noValidate
      className="grid gap-5"
    >
      <form.AppField name="name">
        {(field) => {
          const error = getOnDynamicError(field.state.meta.errorMap);
          return (
            <FieldRow id={field.name} label="Name" error={error}>
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${field.name}-error` : undefined}
                placeholder="Full name"
              />
            </FieldRow>
          );
        }}
      </form.AppField>

      <form.AppField name="address">
        {(field) => (
          <FieldRow id={field.name} label="Address">
            <Input
              id={field.name}
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              onBlur={field.handleBlur}
              placeholder="Street address"
            />
          </FieldRow>
        )}
      </form.AppField>

      <form.AppField name="postcode">
        {(field) => (
          <FieldRow id={field.name} label="Postcode">
            <Input
              id={field.name}
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              onBlur={field.handleBlur}
              placeholder="Postcode"
            />
          </FieldRow>
        )}
      </form.AppField>

      <form.AppField name="nextTask">
        {(field) => (
          <FieldRow id={field.name} label="Next Task">
            <Input
              id={field.name}
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              onBlur={field.handleBlur}
              placeholder="Next action item"
            />
          </FieldRow>
        )}
      </form.AppField>

      <form.AppField name="taskDeadline">
        {(field) => {
          const error = getOnDynamicError(field.state.meta.errorMap);
          return (
            <FieldRow id={field.name} label="Deadline" error={error}>
              <Input
                id={field.name}
                type="date"
                value={dateToInputValue(field.state.value)}
                onChange={(event) => field.handleChange(event.target.value ? new Date(event.target.value) : undefined)}
                onBlur={field.handleBlur}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${field.name}-error` : undefined}
              />
            </FieldRow>
          );
        }}
      </form.AppField>

      <form.AppField name="status2">
        {(field) => (
          <FieldRow id={field.name} label="Status 2">
            <StatusSelect
              id={field.name}
              value={field.state.value}
              onChange={(selectedValue) => field.handleChange(selectedValue)}
              onBlur={field.handleBlur}
              includeBlank
            />
          </FieldRow>
        )}
      </form.AppField>

      <FileUploader uppy={uppy} />

      <form.Subscribe
        selector={(formState) => ({
          canSubmit: formState.canSubmit,
          isSubmitting: formState.isSubmitting,
          isDirty: formState.isDirty,
        })}
      >
        {({ canSubmit, isSubmitting, isDirty }) => (
          <Button
            variant="submit"
            type="submit"
            disabled={!canSubmit || isSubmitting || (!isDirty && fileCount === 0)}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? 'Saving…' : 'Save changes'}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}

// ── Field wrapper ─────────────────────────────────────────────────────────────

type FieldRowProps = {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
};

function FieldRow({ id, label, error, children }: FieldRowProps) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

// ── Status select ─────────────────────────────────────────────────────────────

type StatusSelectProps = {
  id: string;
  value: string;
  onChange: (selectedValue: string) => void;
  onBlur: () => void;
  required?: boolean;
  includeBlank?: boolean;
  invalid?: boolean;
  'aria-describedby'?: string;
};

function StatusSelect({
  id,
  value,
  onChange,
  onBlur,
  required,
  includeBlank,
  invalid,
  'aria-describedby': describedBy,
}: StatusSelectProps) {
  return (
    <select
      id={id}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      required={required}
      aria-invalid={invalid ? true : undefined}
      aria-describedby={describedBy}
      className={cn(
        'h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none',
        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        invalid && 'border-destructive ring-[3px] ring-destructive/20',
        'disabled:cursor-not-allowed disabled:opacity-50',
      )}
    >
      {includeBlank && <option value="">— none —</option>}
      {STATUS_OPTIONS.map((statusOption) => (
        <option key={statusOption} value={statusOption}>
          {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
        </option>
      ))}
    </select>
  );
}
