import { revalidateLogic } from '@tanstack/react-form'
import { useAppForm } from './form-context'
import { recordSchema } from '@/schemas/person'
import type { FullPerson } from '@/types/types'
import { Label } from '@/components/ui/Label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

type StatusValue = FullPerson['status']

const STATUS_OPTIONS: StatusValue[] = ['bronze', 'silver', 'gold', 'do not contact']

type RecordEditFormProps = {
  person: FullPerson
  onSuccess: () => void
}

function getOnDynamicError(fieldErrorMap: Record<string, unknown>): string | undefined {
  const dynamicErrors = fieldErrorMap['onDynamic']
  if (!Array.isArray(dynamicErrors) || dynamicErrors.length === 0) return undefined
  const firstError: unknown = dynamicErrors[0]
  if (typeof firstError === 'string') return firstError
  if (firstError !== null && typeof firstError === 'object' && 'message' in firstError) {
    return String(firstError.message)
  }
  return undefined
}

function dateToInputValue(date: Date | string | undefined): string {
  if (!date) return ''
  const dateObject = date instanceof Date ? date : new Date(date)
  return isNaN(dateObject.getTime()) ? '' : dateObject.toISOString().split('T')[0]
}

export function RecordEditForm({ person, onSuccess }: RecordEditFormProps) {
  const form = useAppForm({
    defaultValues: {
      name:         person.name,
      address:      person.address ?? '',
      postcode:     person.postcode ?? '',
      notes:        person.notes ?? '',
      nextTask:     person.nextTask ?? '',
      taskDeadline: person.taskDeadline,
      status:       person.status,
      status2:      person.status2 ?? '',
    },
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'change',
    }),
    validators: { onDynamic: recordSchema },
    onSubmit: ({ value }) => {
      console.log('Saving record:', value)
      onSuccess()
    },
  })

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        void form.handleSubmit()
      }}
      noValidate
      className="grid gap-5"
    >
      <form.AppField name="name">
        {(field) => {
          const error = getOnDynamicError(field.state.meta.errorMap)
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
          )
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

      <form.AppField name="notes">
        {(field) => (
          <FieldRow id={field.name} label="Notes">
            <Input
              id={field.name}
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              onBlur={field.handleBlur}
              placeholder="Any additional notes"
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
          const error = getOnDynamicError(field.state.meta.errorMap)
          return (
            <FieldRow id={field.name} label="Task Deadline" error={error}>
              <Input
                id={field.name}
                type="date"
                value={dateToInputValue(field.state.value)}
                onChange={(event) =>
                  field.handleChange(
                    event.target.value ? new Date(event.target.value) : undefined,
                  )
                }
                onBlur={field.handleBlur}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${field.name}-error` : undefined}
              />
            </FieldRow>
          )
        }}
      </form.AppField>

      <form.AppField name="status">
        {(field) => {
          const error = getOnDynamicError(field.state.meta.errorMap)
          return (
            <FieldRow id={field.name} label="Status" error={error}>
              <StatusSelect
                id={field.name}
                value={field.state.value}
                onChange={(selectedValue) => field.handleChange(selectedValue as StatusValue)}
                onBlur={field.handleBlur}
                required
                invalid={!!error}
                aria-describedby={error ? `${field.name}-error` : undefined}
              />
            </FieldRow>
          )
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

      <form.Subscribe
        selector={(formState) => ({
          canSubmit:    formState.canSubmit,
          isSubmitting: formState.isSubmitting,
          isDirty:      formState.isDirty,
        })}
      >
        {({ canSubmit, isSubmitting, isDirty }) => (
          <Button
            type="submit"
            disabled={!canSubmit || isSubmitting || !isDirty}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? 'Saving…' : 'Save changes'}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}

// ── Field wrapper ─────────────────────────────────────────────────────────────

type FieldRowProps = {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}

function FieldRow({ id, label, error, children }: FieldRowProps) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-destructive text-xs">
          {error}
        </p>
      )}
    </div>
  )
}

// ── Status select ─────────────────────────────────────────────────────────────

type StatusSelectProps = {
  id: string
  value: string
  onChange: (selectedValue: string) => void
  onBlur: () => void
  required?: boolean
  includeBlank?: boolean
  invalid?: boolean
  'aria-describedby'?: string
}

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
        'border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow]',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        invalid && 'border-destructive ring-destructive/20 ring-[3px]',
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
  )
}
