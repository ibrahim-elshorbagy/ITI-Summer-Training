<?php

use App\Http\Controllers\Doctor\DoctorController;
use App\Http\Controllers\Doctor\DoctorDashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;


//-------------------------------------------------------------------------------
//Not login Routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('/');


//-------------------------------------------------------------------------------------------
//dashboards

Route::get('/dashboard', [AdminController::class, 'switch'])
    ->middleware(['auth'])
    ->name('dashboard');

//-------------------------------------------------------------------------------------------
// Admin routes

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::resource('/book', BookController::class)->except(['index','show']);                                                     //CRUD opertions
    Route::get('/borrowed-books', [BookController::class, 'borrowedBooks'])->name('books.borrowed');
    Route::get('/available-books', [BookController::class, 'availableBooks'])->name('books.available');

});

//-------------------------------------------------------------------------------------------
// Student routes

Route::middleware(['auth', 'role:student'])->group(function () {

    Route::get('student/dashboard', [StudentController::class, 'dashboard'])->name('student.dashboard');

    Route::post('student/borrow/{id}', [StudentController::class, 'borrow'])->name('book.borrow');
    Route::post('student/return/{id}', [StudentController::class, 'return'])->name('book.return');
    Route::get('student/MyBooks', [StudentController::class, 'MyBooks'])->name('student.MyBooks');
});

//-------------------------------------------------------------------------------------------
// Profile routes


Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/photo', [ProfileController::class, 'updateProfileImage'])->name('profile.update-photo');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


});

//-------------------------------------------------------------------------------------------
// books routes

Route::middleware('auth')->group(function () {

    Route::get('/books', [BookController::class,'availableBooks'])->name('books.index');
    Route::get('/books/{book}', [BookController::class,'show'])->name('book.show');


});

require __DIR__.'/auth.php';
