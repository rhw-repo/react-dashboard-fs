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
import { Input } from '../input';
import type { FullPerson } from '@/types/types';
import { Label } from '@/components/ui/label';

type RecordEditModalProps = {
  person: FullPerson;
};


export const RecordEditModal = ({ person }: RecordEditModalProps) => {



  return (
    <Sheet>
      <SheetTrigger><Button variant="outline">Edit</Button></SheetTrigger>
      <SheetContent side='top'>
        <SheetHeader>
          <SheetTitle>Edit: {person.name}</SheetTitle>
          <SheetDescription>Make changes to the record here. Click save when you are finished.</SheetDescription>
        </SheetHeader>
        <>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          </div>
          </>
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


