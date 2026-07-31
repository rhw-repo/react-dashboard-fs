import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/Button';
import type { FullPerson } from '@/types/types';
import { RecordEditForm } from './RecordEditForm';

type RecordEditModalProps = {
  person: FullPerson | null;
  onClose: () => void;
};

export const RecordEditModal = ({ person, onClose }: RecordEditModalProps) => {
  // Keep rendering the last-opened person while the sheet slides closed,
  // so the content doesn't flash blank mid-animation once `person` goes back to null.
  const [displayPerson, setDisplayPerson] = React.useState<FullPerson | null>(person);

  React.useEffect(() => {
    if (person) setDisplayPerson(person);
  }, [person]);

  // TEMP DIAGNOSTIC — remove once the refactor is confirmed working
  console.log('[RecordEditModal] render, open =', person !== null, 'person =', person?._id ?? null);
  React.useEffect(() => {
    console.log('[RecordEditModal] MOUNTED');
    return () => console.log('[RecordEditModal] UNMOUNTED');
  }, []);

  return (
    <Sheet
      open={person !== null}
      onOpenChange={(next) => {
        console.log('[RecordEditModal] onOpenChange called with', next);
        if (!next) onClose();
      }}
    >
      <SheetContent
        side="top"
        className="flex place-content-center mx-auto my-60 max-w-200 overflow-auto dark:shadow-xl/50 dark:shadow-indigo-500/50"
      >
        {displayPerson && (
          <>
            <SheetHeader className="items-center">
              <SheetTitle>Edit: {displayPerson.name}</SheetTitle>
              <SheetDescription>Make changes to the record here. Click save when you are finished.</SheetDescription>
            </SheetHeader>
            <div className="px-4 py-6">
              <RecordEditForm key={displayPerson._id} person={displayPerson} onSuccess={onClose} />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
