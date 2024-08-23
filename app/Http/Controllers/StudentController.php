<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Borrowing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{

    public function dashboard(){
        return inertia('Student/Dashboard');
    }



    public function borrow($id)
    {
        // Get the authenticated user
        $user = Auth::user();

        // Validate the book ID (passed as $id)
        $validator = Validator::make(['book_id' => $id], [
            'book_id' => 'required|exists:books,id',
        ]);

        if ($validator->fails()) {

        return to_route('books.index')
            ->with('danger',"Invalid book ID");

        }


        // Check if the book is already borrowed by the user
        $existingBorrow = Borrowing::where('user_id', $user->id)
            ->where('book_id', $id)
            ->where('status', 'borrowed')
            ->first();

        if ($existingBorrow) {
            return to_route('books.index')
                ->with('danger',"you already borrowed this book");
        }

        // Create a new borrowing record
        $borrowing = Borrowing::create([
            'user_id' => $user->id,
            'book_id' => $id,
            'borrowed_at' => now(),
            'status' => 'borrowed',
        ]);

        return to_route('books.index')
                ->with('success',"the book has been borrowed");

    }

    public function MyBooks()
    {

        $user = Auth::user();
        $booksId = Borrowing::where('user_id', $user->id)->where('status', 'borrowed')->pluck('book_id');

        $books = Book::whereIn('id', $booksId)->get();
        return inertia('Student/MyBooks/Index', [
            'books' => $books,
            'success'=>session('success'),
            'danger'=>session('danger')
        ]);
    }

    public function return($id)
    {
        // Get the authenticated user
        $user = Auth::user();


        // Validate the book ID (passed as $id)
        $validator = Validator::make(['book_id' => $id], [
            'book_id' => 'required|exists:books,id',
        ]);

        if ($validator->fails()) {
            return to_route('books.index')
                ->with('danger', "Invalid book ID");
        }

        // Check if the book is borrowed by the user and has not yet been returned
        $borrowedBook = Borrowing::where('user_id', $user->id)
            ->where('book_id', $id)
            ->where('status', 'borrowed')
            ->first();


        // Mark the book as returned
        $borrowedBook->update([
            'returned_at' => now(),
            'status' => 'returned',
        ]);

        return to_route('student.MyBooks')
                ->with('success', "The book has been successfully returned.");
    }

}
