'use server'

import {revalidatePath} from 'next/cache'
import prisma from "@/prisma/db";
import {auth} from '@clerk/nextjs/server'


export async function createNote(formData: FormData) {
    const {userId} = await auth()

    if (!userId) {
        throw new Error('User not authenticated')
    }


    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const category = formData.get('category') as string

    if (!title || !content || !category) {
        throw new Error('Missing required fields')
    }


    try {
        const categoryRecord = await prisma.category.upsert({
            where: {name: category},
            update: {},
            create: {name: category},
        })

        const note = await prisma.note.create({
            data: {
                title,
                content,
                userId,
                categoryId: categoryRecord.id,
            },
        })

        revalidatePath('/')
        return {success: true, note}
    } catch (error) {
        console.error('Failed to create note:', error)
        return {success: false, error: 'Failed to create note'}
    }
}

export async function getNotes() {
    const {userId} = await auth()

    if (!userId) {
        throw new Error('User not authenticated')
    }

    try {
        const notes = await prisma.note.findMany({
            where: {userId},
            include: {category: true},
            orderBy: {createdAt: 'desc'},
        })

        return {success: true, notes}
    } catch (error) {
        console.error('Failed to fetch notes:', error)
        return {success: false, error: 'Failed to fetch notes'}
    }
}

export async function updateNote(noteId: string, formData: FormData) {
    const {userId} = await auth()

    if (!userId) {
        throw new Error('User not authenticated')
    }

    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const category = formData.get('category') as string

    if (!title || !content || !category) {
        throw new Error('Missing required fields')
    }

    try {
        const categoryRecord = await prisma.category.upsert({
            where: {name: category},
            update: {},
            create: {name: category},
        })

        const updatedNote = await prisma.note.update({
            where: {id: noteId, userId},
            data: {
                title,
                content,
                categoryId: categoryRecord.id,
            },
        })

        revalidatePath('/')
        return {success: true, note: updatedNote}
    } catch (error) {
        console.error('Failed to update note:', error)
        return {success: false, error: 'Failed to update note'}
    }
}

export async function deleteNote(noteId: string) {
    const {userId} = await auth()

    if (!userId) {
        throw new Error('User not authenticated')
    }

    try {
        await prisma.note.delete({
            where: {id: noteId, userId},
        })

        revalidatePath('/')
        return {success: true}
    } catch (error) {
        console.error('Failed to delete note:', error)
        return {success: false, error: 'Failed to delete note'}
    }
}