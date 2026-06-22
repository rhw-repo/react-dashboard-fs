import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/Button';
import type { FullPerson } from '@/types/types';
import { RecordEditForm } from './RecordEditForm';

type RecordEditModalProps = {
  person: FullPerson;
};

export const RecordEditModal = ({ person }: RecordEditModalProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <section>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">Edit</Button>
        </SheetTrigger>
        <SheetContent side="top" className="mx-auto my-12 max-w-550 overflow-auto">
          <SheetHeader>
            <SheetTitle>Edit: {person.name}</SheetTitle>
            <SheetDescription>Make changes to the record here. Click save when you are finished.</SheetDescription>
          </SheetHeader>
          <div className="px-4 py-6">
            <RecordEditForm person={person} onSuccess={() => setIsOpen(false)} />
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </section>
  );
};
