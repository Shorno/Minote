import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { addCategory } from "@/actions/notesAction"

interface Note {
    id: string
    title: string
    content: string
    category: {
        name: string
    }
}

interface NoteCardProps {
    note: Note
    onUpdate: (id: string, formData: FormData) => void
    onDelete: (id: string) => void
    categories: string[]
    onCategoryAdd: (category: string) => void
}

export default function NoteCard({
                                     note,
                                     onUpdate,
                                     onDelete,
                                     categories,
                                     onCategoryAdd
                                 }: NoteCardProps) {
    const [editedNote, setEditedNote] = useState(note)
    const [newCategory, setNewCategory] = useState('')
    const { toast } = useToast()

    const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        onUpdate(note.id, formData)
    }

    const handleAddCategory = async () => {
        if (newCategory && !categories.includes(newCategory)) {
            const result = await addCategory(newCategory)

            if (result.success) {
                onCategoryAdd(newCategory)
                setEditedNote(prev => ({
                    ...prev,
                    category: { name: newCategory }
                }))
                setNewCategory('')
                toast({
                    title: "Category added",
                    description: `New category "${newCategory}" has been added.`,
                })
            } else {
                toast({
                    title: "Error",
                    description: result.error,
                    variant: "destructive",
                })
            }
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    {note.title}
                    <Badge>{note.category.name}</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-600">{note.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Edit</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit note</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleUpdate}>
                            <div className="grid gap-4 py-4">
                                <Input
                                    name="title"
                                    placeholder="Note title"
                                    value={editedNote.title}
                                    onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
                                />
                                <Textarea
                                    name="content"
                                    placeholder="Note content"
                                    value={editedNote.content}
                                    onChange={(e) => setEditedNote({ ...editedNote, content: e.target.value })}
                                />
                                <Select
                                    name="category"
                                    value={editedNote.category.name}
                                    onValueChange={(value) => setEditedNote({ ...editedNote, category: { name: value } })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
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
                                    <Button onClick={handleAddCategory} type="button">Add Category</Button>
                                </div>
                            </div>
                            <Button type="submit">Update Note</Button>
                        </form>
                    </DialogContent>
                </Dialog>
                <Button variant="destructive" onClick={() => onDelete(note.id)}>Delete</Button>
            </CardFooter>
        </Card>
    )
}