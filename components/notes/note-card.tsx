import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface Note {
    id: number
    title: string
    content: string
    category: string
}

interface NoteCardProps {
    note: Note
    onUpdate: (id: number, updatedNote: Partial<Note>) => void
    onDelete: (id: number) => void
    categories: string[]
}

export default function NoteCard({ note, onUpdate, onDelete, categories }: NoteCardProps) {
    const [editedNote, setEditedNote] = useState(note)
    const [newCategory, setNewCategory] = useState('')

    const handleUpdate = () => {
        onUpdate(note.id, editedNote)
    }

    const addCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            onUpdate(note.id, { ...editedNote, category: newCategory })
            setNewCategory('')
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    {note.title}
                    <Badge>{note.category}</Badge>
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
                        <div className="grid gap-4 py-4">
                            <Input
                                placeholder="Note title"
                                value={editedNote.title}
                                onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
                            />
                            <Textarea
                                placeholder="Note content"
                                value={editedNote.content}
                                onChange={(e) => setEditedNote({ ...editedNote, content: e.target.value })}
                            />
                            <Select
                                value={editedNote.category}
                                onValueChange={(value) => setEditedNote({ ...editedNote, category: value })}
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
                                <Button onClick={addCategory} type="button">Add Category</Button>
                            </div>
                        </div>
                        <Button onClick={handleUpdate}>Update Note</Button>
                    </DialogContent>
                </Dialog>
                <Button variant="destructive" onClick={() => onDelete(note.id)}>Delete</Button>
            </CardFooter>
        </Card>
    )
}

