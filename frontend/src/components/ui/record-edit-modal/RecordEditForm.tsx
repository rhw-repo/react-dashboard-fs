import { useState } from 'react';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { useUppyState } from '@uppy/react';
import { revalidateLogic } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppForm } from './form-context';
import { recordSchema, type RecordFormValues } from '@/schemas/person';
import type { FullPerson } from '@/types/types';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { FileUploader } from './FileUploader';
import { API_ENDPOINTS } from '@/components/ui/utils/endpoints';

type StatusValue = FullPerson['status'];

const STATUS_OPTIONS: StatusValue[] = ['bronze', 'silver', 'gold', 'do not contact'];

type RecordEditFormProps = {
  person: FullPerson;
  onSuccess: () => void;
};

type UpdatePersonPayload = {
  name: string;
  address: string;
  postcode: string;
  nextTask: string;
  taskDeadline?: string;
  status2: string;
  stagingIds: string[];
  otherData: {
    datesOfWills: string[];
    willIds: string[];
    datesOfCodicils: string[];
    codicilIds: string[];
    dob?: string;
    executorIds: string[];
    beneficiaryIds: string[];
    contactNumbers: string[];
    emailAddresses: string[];
    previousAddresses: string[];
  };
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
  return Number.isNaN(dateObject.getTime()) ? '' : dateObject.toISOString().split('T')[0];
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kilobytes = bytes / 1024;
  if (kilobytes < 1024) return `${kilobytes.toFixed(1)} KB`;
  return `${(kilobytes / 1024).toFixed(1)} MB`;
}

function getSubmitButtonLabel(isStagingFiles: boolean, isSubmitting: boolean): string {
  switch (true) {
    case isStagingFiles:
      return 'Uploading…';
    case isSubmitting:
      return 'Saving…';
    default:
      return 'Save changes';
  }
}

export function RecordEditForm({ person, onSuccess }: Readonly<RecordEditFormProps>) {
  const [uppy] = useState(() =>
    new Uppy({
      id: `record-uploader-${person._id}`,
      // no need to press an 'upload button
      autoProceed: true,
      restrictions: { maxFileSize: 50 * 1024 * 1024 },
    }).use(XHRUpload, {
      endpoint: `${API_ENDPOINTS.people}/${person._id}/files/stage`,
      fieldName: 'file',
      formData: true,
      bundle: false,
    }),
  );

  const { fileCount, isStagingFiles } = useUppyState(uppy, (state) => ({
    fileCount: Object.keys(state.files).length,
    isStagingFiles: Object.values(state.files).some((file) => !file.progress?.uploadComplete),
  }));

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: UpdatePersonPayload) => {
      const res = await fetch(`${API_ENDPOINTS.people}/${person._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      return res.json() as Promise<FullPerson>;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['people'] });
      onSuccess();
    },
  });

  const deleteFileMutation = useMutation({
    mutationFn: async (fileId: string) => {
      const res = await fetch(`${API_ENDPOINTS.people}/${person._id}/files/${fileId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      return res.json() as Promise<FullPerson>;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['people'] });
    },
  });

  const [hasRemovedFile, setHasRemovedFile] = useState(false);

  const defaultValues: RecordFormValues = {
    name: person.name,
    address: person.address ?? '',
    postcode: person.postcode ?? '',
    nextTask: person.nextTask ?? '',
    taskDeadline: person.taskDeadline ? new Date(person.taskDeadline) : undefined,
    status2: person.status2 ?? '',
    otherData: {
      datesOfWills: (person.otherData?.datesOfWills ?? []).map((date) => new Date(date)),
      willIds: person.otherData?.willIds ?? [],
      datesOfCodicils: (person.otherData?.datesOfCodicils ?? []).map((date) => new Date(date)),
      codicilIds: person.otherData?.codicilIds ?? [],
      dob: person.otherData?.dob ? new Date(person.otherData.dob) : undefined,
      executorIds: person.otherData?.executorIds ?? [],
      beneficiaryIds: person.otherData?.beneficiaryIds ?? [],
      contactNumbers: person.otherData?.contactNumbers ?? [],
      emailAddresses: person.otherData?.emailAddresses ?? [],
      previousAddresses: person.otherData?.previousAddresses ?? [],
    },
  };

  const form = useAppForm({
    defaultValues,
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'change',
    }),
    validators: { onDynamic: recordSchema },
    onSubmit: async ({ value }) => {
      const stagingIds = uppy
        .getFiles()
        .map((file) => (file.response?.body as { stagingID?: string } | undefined)?.stagingID)
        .filter((stagingID): stagingID is string => Boolean(stagingID));

      const payload: UpdatePersonPayload = {
        name: value.name,
        address: value.address,
        postcode: value.postcode,
        nextTask: value.nextTask,
        taskDeadline: value.taskDeadline ? value.taskDeadline.toISOString() : undefined,
        status2: value.status2,
        stagingIds,
        otherData: {
          datesOfWills: value.otherData.datesOfWills.map((date) => date.toISOString()),
          willIds: value.otherData.willIds,
          datesOfCodicils: value.otherData.datesOfCodicils.map((date) => date.toISOString()),
          codicilIds: value.otherData.codicilIds,
          dob: value.otherData.dob ? value.otherData.dob.toISOString() : undefined,
          executorIds: value.otherData.executorIds,
          beneficiaryIds: value.otherData.beneficiaryIds,
          contactNumbers: value.otherData.contactNumbers,
          emailAddresses: value.otherData.emailAddresses,
          previousAddresses: value.otherData.previousAddresses,
        },
      };

      try {
        await mutation.mutateAsync(payload);
      } catch {
        // error state available via mutation.isError / mutation.error
      }
    },
  });

  const visibleNotes = person.notes?.filter((file) => !file.archived) ?? [];

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
                className="w-1/2"
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

      <div className="flex gap-4">
        <form.AppField name="address">
          {(field) => (
            <FieldRow id={field.name} label="Address" className="flex-1">
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
                className="w-40"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                placeholder="Postcode"
              />
            </FieldRow>
          )}
        </form.AppField>
      </div>

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

      <div className="flex gap-4">
        <form.AppField name="taskDeadline">
          {(field) => {
            const error = getOnDynamicError(field.state.meta.errorMap);
            return (
              <FieldRow id={field.name} label="Deadline" error={error}>
                <Input
                  id={field.name}
                  type="date"
                  className="w-40"
                  value={dateToInputValue(field.state.value)}
                  onChange={(event) =>
                    field.handleChange(event.target.value ? new Date(event.target.value) : undefined)
                  }
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
                className="w-40"
                value={field.state.value}
                onChange={(selectedValue) => field.handleChange(selectedValue)}
                onBlur={field.handleBlur}
                includeBlank
              />
            </FieldRow>
          )}
        </form.AppField>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-5 border-t border-input pt-5 sm:grid-cols-2">
        <p className="text-sm font-semibold sm:col-span-2">Other data</p>

        <form.AppField name="otherData.dob">
          {(field) => (
            <FieldRow id={field.name} label="Date of birth">
              <Input
                id={field.name}
                type="date"
                className="w-40"
                value={dateToInputValue(field.state.value)}
                onChange={(event) =>
                  field.handleChange(event.target.value ? new Date(event.target.value) : undefined)
                }
                onBlur={field.handleBlur}
              />
            </FieldRow>
          )}
        </form.AppField>

        <form.AppField name="otherData.contactNumbers">
          {(field) => (
            <StringListField
              label="Contact numbers"
              values={field.state.value}
              onChange={field.handleChange}
              placeholder="Phone number"
            />
          )}
        </form.AppField>

        <form.AppField name="otherData.emailAddresses">
          {(field) => (
            <StringListField
              label="Email addresses"
              values={field.state.value}
              onChange={field.handleChange}
              placeholder="name@example.com"
              inputType="email"
            />
          )}
        </form.AppField>

        <form.AppField name="otherData.previousAddresses">
          {(field) => (
            <StringListField
              label="Previous addresses"
              values={field.state.value}
              onChange={field.handleChange}
              placeholder="Previous address"
            />
          )}
        </form.AppField>

        {/* Wills: datesOfWills/willIds are parallel arrays — edited as paired date+id rows, split back into
            the two arrays on change so the wire shape (see recordSchema) stays flat. */}
        <form.Subscribe selector={(formState) => ({ dates: formState.values.otherData.datesOfWills, ids: formState.values.otherData.willIds })}>
          {({ dates, ids }) => (
            <PairedDateIdListField
              label="Wills"
              dates={dates}
              ids={ids}
              idPlaceholder="Will ID"
              onChange={(nextDates, nextIds) => {
                form.setFieldValue('otherData.datesOfWills', nextDates);
                form.setFieldValue('otherData.willIds', nextIds);
              }}
            />
          )}
        </form.Subscribe>

        {/* Codicils: same parallel-array pattern as Wills above. */}
        <form.Subscribe
          selector={(formState) => ({ dates: formState.values.otherData.datesOfCodicils, ids: formState.values.otherData.codicilIds })}
        >
          {({ dates, ids }) => (
            <PairedDateIdListField
              label="Codicils"
              dates={dates}
              ids={ids}
              idPlaceholder="Codicil ID"
              onChange={(nextDates, nextIds) => {
                form.setFieldValue('otherData.datesOfCodicils', nextDates);
                form.setFieldValue('otherData.codicilIds', nextIds);
              }}
            />
          )}
        </form.Subscribe>

        <form.AppField name="otherData.executorIds">
          {(field) => (
            <StringListField
              label="Executor IDs"
              values={field.state.value}
              onChange={field.handleChange}
              placeholder="Executor ID"
            />
          )}
        </form.AppField>

        <form.AppField name="otherData.beneficiaryIds">
          {(field) => (
            <StringListField
              label="Beneficiary IDs"
              values={field.state.value}
              onChange={field.handleChange}
              placeholder="Beneficiary ID"
            />
          )}
        </form.AppField>
      </div>

      {visibleNotes.length > 0 && (
        <div className="grid gap-1.5">
          <Label>Existing files</Label>
          <ul className="grid gap-1 rounded-md border border-input px-3 py-2 text-sm">
            {visibleNotes.map((file, index) => (
              <li key={`${file.fileName}-${index}`} className="flex items-center justify-between gap-2">
                <span className="truncate">{file.fileName}</span>
                <span className="shrink-0 text-base text-muted-foreground">{formatFileSize(file.fileSize)}</span>
                <Button
                  variant={'remove'}
                  type="button"
                  disabled={deleteFileMutation.isPending && deleteFileMutation.variables === file._id}
                  onClick={() => {
                    deleteFileMutation.mutate(file._id);
                    setHasRemovedFile(true);
                  }}
                >
                  remove
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

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
            disabled={!canSubmit || isSubmitting || isStagingFiles || (!isDirty && fileCount === 0 && !hasRemovedFile)}
            className="w-full sm:w-auto"
          >
            {getSubmitButtonLabel(isStagingFiles, isSubmitting)}
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
  className?: string;
  children: React.ReactNode;
};

function FieldRow({ id, label, error, className, children }: Readonly<FieldRowProps>) {
  return (
    <div className={cn('grid gap-1.5', className)}>
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
  value: StatusValue | '';
  onChange: (selectedValue: StatusValue | '') => void;
  onBlur: () => void;
  required?: boolean;
  includeBlank?: boolean;
  invalid?: boolean;
  className?: string;
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
  className,
  'aria-describedby': describedBy,
}: Readonly<StatusSelectProps>) {
  return (
    <select
      id={id}
      value={value}
      onChange={(event) => {
        const nextValue: StatusValue | '' = event.target.value as StatusValue | '';
        onChange(nextValue);
      }}
      onBlur={onBlur}
      required={required}
      aria-invalid={invalid ? true : undefined}
      aria-describedby={describedBy}
      className={cn(
        'h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none',
        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        invalid && 'border-destructive ring-[3px] ring-destructive/20',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
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

// ── String list field (contactNumbers, emailAddresses, previousAddresses, executorIds, beneficiaryIds) ────

type StringListFieldProps = {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  inputType?: 'text' | 'email';
};

function StringListField({ label, values, onChange, placeholder, inputType = 'text' }: Readonly<StringListFieldProps>) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      <div className="grid gap-2">
        {values.map((value, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              type={inputType}
              value={value}
              onChange={(event) => {
                const next = [...values];
                next[index] = event.target.value;
                onChange(next);
              }}
              placeholder={placeholder}
            />
            <Button variant="remove" type="button" onClick={() => onChange(values.filter((_, i) => i !== index))}>
              remove
            </Button>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" type="button" onClick={() => onChange([...values, ''])} className="w-fit">
        + Add
      </Button>
    </div>
  );
}

// ── Paired date+id list field (wills, codicils) ──────────────────────────────
//
// datesOfWills/willIds (and datesOfCodicils/codicilIds) are stored as parallel
// arrays in the payload, but edited as paired date+id rows here; onChange
// receives both arrays back in sync. New rows default to today's date rather
// than leaving it unset, since the wire schema treats dates as always-present.

type PairedDateIdListFieldProps = {
  label: string;
  dates: Date[];
  ids: string[];
  idPlaceholder?: string;
  onChange: (nextDates: Date[], nextIds: string[]) => void;
};

function PairedDateIdListField({ label, dates, ids, idPlaceholder, onChange }: Readonly<PairedDateIdListFieldProps>) {
  const rowCount = Math.max(dates.length, ids.length);

  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      <div className="grid gap-2">
        {Array.from({ length: rowCount }, (_, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              type="date"
              className="w-44 shrink-0"
              value={dateToInputValue(dates[index])}
              onChange={(event) => {
                if (!event.target.value) return;
                const nextDates = [...dates];
                nextDates[index] = new Date(event.target.value);
                onChange(nextDates, ids);
              }}
            />
            <Input
              value={ids[index] ?? ''}
              onChange={(event) => {
                const nextIds = [...ids];
                nextIds[index] = event.target.value;
                onChange(dates, nextIds);
              }}
              placeholder={idPlaceholder}
            />
            <Button
              variant="remove"
              type="button"
              onClick={() =>
                onChange(
                  dates.filter((_, i) => i !== index),
                  ids.filter((_, i) => i !== index),
                )
              }
            >
              remove
            </Button>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        size="sm"
        type="button"
        onClick={() => onChange([...dates, new Date()], [...ids, ''])}
        className="w-fit"
      >
        + Add
      </Button>
    </div>
  );
}
