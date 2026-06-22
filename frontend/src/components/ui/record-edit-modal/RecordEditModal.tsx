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
import { Label } from '@/components/ui/Label';

type RecordEditModalProps = {
  person: FullPerson;
};

export const RecordEditModal = ({ person }: RecordEditModalProps) => {

  return (
    <section>
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Edit</Button></SheetTrigger>
      <SheetContent side='top' className="mx-auto my-12 max-w-550 overflow-auto">
        <SheetHeader>
          <SheetTitle>Edit: {person.name}</SheetTitle>
          <SheetDescription>Make changes to the record here. Click save when you are finished.</SheetDescription>
        </SheetHeader>
        <>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="" />
            <Label htmlFor="address">Address</Label>
            <Input id="address" defaultValue="" />
            <Label htmlFor="postcode">Postcode</Label>
            <Input id="postcdoe" defaultValue="" />
            <Label htmlFor="notes">Notes</Label>
            <Input id="notes" defaultValue="" />
            <Label htmlFor="nextTask">Next Task</Label>
            <Input id="nextTask" defaultValue="" />
            <Label htmlFor="taskDeadline">Task Deadline</Label>
            <Input id="taskDeadline" defaultValue="" />
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
    </section>
  );
};


