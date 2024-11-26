import {DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";

interface NoteModalFormProps {
    newNote: { title: string, content: string, category: string }
    setNewNote: (note: { title: string, content: string, category: string }) => void
    categories: string[]
    newCategory: string
    setNewCategory: (category: string) => void
    addCategory: () => void
    addNote: () => void
}

export default function NoteModalForm({
                                          newNote,
                                          setNewNote,
                                          categories,
                                          newCategory,
                                          setNewCategory,
                                          addCategory,
                                          addNote
                                      } : NoteModalFormProps) {
    return (
        <>
            <DialogHeader>
                <DialogTitle>Create a new note</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <Input
                    placeholder="Note title"
                    value={newNote.title}
                    onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                />
                <Textarea
                    placeholder="Note content"
                    value={newNote.content}
                    onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                />
                <Select
                    value={newNote.category}
                    onValueChange={(value) => setNewNote({...newNote, category: value})}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category"/>
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div className="flex gap-2">
                    <Input
                        placeholder="New category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <Button onClick={addCategory} type="button">Add Category</Button>
                </div>
            </div>
            <Button onClick={addNote}>Create Note</Button>
        </>
    )
}