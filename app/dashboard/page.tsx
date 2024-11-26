'use client'

import {useState, useEffect} from 'react'
import {useUser} from '@clerk/nextjs'
import {Plus} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {useToast} from "@/hooks/use-toast";
import {addCategory, createNote, deleteNote, getNotes, updateNote} from "@/actions/notesAction";
import CategoryFilter from "@/components/notes/category-filter";
import NoteCard from "@/components/notes/note-card";


interface Note {
    id: string
    title: string
    content: string
    category: {
        name: string
    }
}

export default function Dashboard() {
    const {user} = useUser()
    const [notes, setNotes] = useState<Note[]>([])
    const [newNote, setNewNote] = useState({title: '', content: '', category: ''})
    const [categories, setCategories] = useState<string[]>([])
    const [newCategory, setNewCategory] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const {toast} = useToast()

    useEffect(() => {
        if (user) {
            fetchNotes()
        }
    }, [user])

    const fetchNotes = async () => {
        const result = await getNotes()
        if (result.success) {
            setNotes(result.notes ?? [])
            const uniqueCategories = [...new Set((result.notes ?? []).map(note => note.category.name))]
            setCategories(uniqueCategories)
        } else {
            toast({
                title: "Error",
                description: result.error,
                variant: "destructive",
            })
        }
    }

    const addNote = async (formData: FormData) => {
        if (!user) {
            toast({
                title: "Error",
                description: "You must be logged in to create a note.",
                variant: "destructive",
            })
            return
        }

        const result = await createNote(formData)

        if (result.success) {
            await fetchNotes()
            setNewNote({title: '', content: '', category: ''})
            toast({
                title: "Note created",
                description: "Your note has been successfully created.",
            })
        } else {
            toast({
                title: "Error",
                description: result.error,
                variant: "destructive",
            })
        }
    }

    const handleUpdateNote = async (id: string, formData: FormData) => {
        const result = await updateNote(id, formData)
        if (result.success) {
            await fetchNotes()
            toast({
                title: "Note updated",
                description: "Your note has been successfully updated.",
            })
        } else {
            toast({
                title: "Error",
                description: result.error,
                variant: "destructive",
            })
        }
    }

    const handleDeleteNote = async (id: string) => {
        const result = await deleteNote(id)
        if (result.success) {
            await fetchNotes()
            toast({
                title: "Note deleted",
                description: "Your note has been successfully deleted.",
            })
        } else {
            toast({
                title: "Error",
                description: result.error,
                variant: "destructive",
            })
        }
    }

    const handleAddCategory = async () => {
        if (newCategory && !categories.includes(newCategory)) {
            const result = await addCategory(newCategory)

            if (result.success) {
                setCategories([...categories, newCategory])
                setNewNote({...newNote, category: newCategory})
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


    const filteredNotes = selectedCategory
        ? notes.filter(note => note.category.name === selectedCategory)
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
                        <DialogHeader>
                            <DialogTitle>Create a new note</DialogTitle>
                        </DialogHeader>
                        <form action={addNote}>
                            <div className="grid gap-4 py-4">
                                <Input
                                    name="title"
                                    placeholder="Note title"
                                    value={newNote.title}
                                    onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                                />
                                <Textarea
                                    name="content"
                                    placeholder="Note content"
                                    value={newNote.content}
                                    onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                                />
                                <Select
                                    name="category"
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
                                    <Button onClick={handleAddCategory} type="button">Add Category</Button>
                                </div>
                            </div>
                            <Button type="submit">Create Note</Button>
                        </form>
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
                        onUpdate={handleUpdateNote}
                        onDelete={handleDeleteNote}
                        categories={categories}
                        onCategoryAdd={(newCategory) => {
                            setCategories(prev => [...prev, newCategory])
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

