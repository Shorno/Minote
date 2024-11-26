"use client"

import {useState} from 'react'
import {Plus} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog"
import {useToast} from "@/hooks/use-toast";
import CategoryFilter from "@/components/notes/category-filter";
import NoteCard from "@/components/notes/note-card";
import NoteModalForm from "@/components/notes/note-modal-form";

interface Note {
    id: number
    title: string
    content: string
    category: string
}

export default function Dashboard() {
    const [notes, setNotes] = useState<Note[]>([])
    const [newNote, setNewNote] = useState({title: '', content: '', category: ''})
    const [categories, setCategories] = useState(['Work', 'Personal', 'Ideas', 'To-Do'])
    const [newCategory, setNewCategory] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const {toast} = useToast()

    const addNote = () => {
        if (newNote.title && newNote.content && newNote.category) {
            setNotes([...notes, {id: Date.now(), ...newNote}])
            setNewNote({title: '', content: '', category: ''})
            toast({
                title: "Note created",
                description: "Your note has been successfully created.",
            })
        }
    }

    const updateNote = (id: number, updatedNote: Partial<Note>) => {
        setNotes(notes.map(note => note.id === id ? {...note, ...updatedNote} : note))
        toast({
            title: "Note updated",
            description: "Your note has been successfully updated.",
        })
    }

    const deleteNote = (id: number) => {
        setNotes(notes.filter(note => note.id !== id))
        toast({
            title: "Note deleted",
            description: "Your note has been successfully deleted.",
        })
    }

    const addCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory])
            setNewNote({...newNote, category: newCategory})
            setNewCategory('')
            toast({
                title: "Category added",
                description: `New category "${newCategory}" has been added.`,
            })
        }
    }

    const filteredNotes = selectedCategory
        ? notes.filter(note => note.category === selectedCategory)
        : notes

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Notes</h1>
            <div className="flex justify-between items-center mb-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4"/> Add Note
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <NoteModalForm
                            newNote={newNote}
                            setNewNote={setNewNote}
                            categories={categories}
                            newCategory={newCategory}
                            setNewCategory={setNewCategory}
                            addCategory={addCategory}
                            addNote={addNote}
                        />
                    </DialogContent>
                </Dialog>
                <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredNotes.map(note => (
                    <NoteCard
                        key={note.id}
                        note={note}
                        onUpdate={updateNote}
                        onDelete={deleteNote}
                        categories={categories}
                    />
                ))}
            </div>
        </div>
    )
}

