import { Injectable } from '@nestjs/common';
import { json } from 'stream/consumers';

@Injectable()
export class HomeService {

    private books = [] = [
        { id: 1, title: 'Book One', author: 'Author One' },
        { id: 2, title: 'Book Two', author: 'Author Two' },
        { id: 3, title: 'Book Three', author: 'Author Three' },
    ];

    private res = { 
        json: (data: any) => {
            console.log('Response:', data);
            return data;
        },
        status: (code: number) => {
            console.log('Status Code:', code);
            return this.res;
        }
     };

    getBooks() {
        return this.res.status(200).json(this.books);
    }
    getBookById(id: number) {
        const book = this.books.find(book => book.id === id);
        if (!book) {
            return this.res.status(404).json({ message: 'Book not found' });
        }
        return this.res.status(200).json(book);
    }
    addBook(book: { title: string; author: string }) {
        const newBook = { id: this.books.length + 1, ...book };
        this.books.push(newBook);
        return newBook;
    }
    updateBook(id: number, book: { title?: string; author?: string }) {
        const existingBook = this.getBookById(id);
        if (!existingBook) {
            return null;
        }
        Object.assign(existingBook, book);
        return existingBook;
    }
    deleteBook(id: number) {
        const index = this.books.findIndex(book => book.id === id);
        if (index === -1) {
            return null;
        }
        const deletedBook = this.books.splice(index, 1);
        return deletedBook[0];
    }
}
