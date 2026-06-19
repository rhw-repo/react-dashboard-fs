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

type RecordEditModalProps = {
  person: FullPerson;
};

export const RecordEditModal = ({ person }: RecordEditModalProps) => {
  return (
    <Sheet>
      <SheetTrigger><Button variant="outline">Edit</Button></SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit: {person.name}</SheetTitle>
          <SheetDescription>Make changes to the record here. Click save when you are finished.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};


