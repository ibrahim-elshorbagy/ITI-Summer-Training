<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::all();

        return inertia('Book/Index',[
            'books' =>  $books,
            'success'=>session('success'),
            'danger'=>session('danger')

        ]);
    }

    public function create()
    {

        return inertia('Book/Create');

    }


    public function store(Request $request)
    {

        $data = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'author' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,svg',

        ]);
        $image = $request->file('image');

                if ($image) {
                    $path = $image->store('books/' . Str::random(), 'public');
                    unset($data['image']);
                    $data['cover_photo_url'] = $path && !(str_starts_with($path, 'http')) ?
                        Storage::url($path) : $path;
                }

        Book::create($data);

        return to_route('book.index')
            ->with('success', "book Created successfully");

    }


    public function show(string $id)
    {

        $book = Book::find($id);
        return inertia('Book/Show',[
            'book' => new BookResource($book)
        ]);
    }


    public function edit(string $id)
    {

        $book = Book::find($id);

        return inertia('Book/Edit',[
            'book' =>  $book
        ]);
    }


    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'author' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,svg',
        ]);

        $book = Book::findOrFail($id);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
                    unset($data['image']);

            $path = $image->store('books/' . Str::random(), 'public');

            $data['cover_photo_url'] = $path && !(str_starts_with($path, 'http')) ? Storage::url($path) : $path;
        }

        $book->update($data);

        return to_route('book.index')
            ->with('success', "Book updated successfully");
    }



    public function destroy(string $id)
    {
        $book = Book::find($id);
        $book->delete();
        return to_route('book.index')->with('success','Book deleted successfully');

    }
}
