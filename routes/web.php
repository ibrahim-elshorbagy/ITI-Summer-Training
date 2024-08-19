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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('/');

Route::get('/dashboard', function () {
    $user = Auth::user();

    if ($user->hasRole('admin')) {

        return Redirect::route('admin.dashboard');

    } elseif ($user->hasRole('student')) {

        return Redirect::route('student.dashboard');
    }
})->middleware(['auth'])->name('dashboard');

// Admin routes
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');

});

// Student routes
Route::middleware(['auth', 'role:student'])->group(function () {
    Route::get('student/dashboard', [StudentController::class, 'dashboard'])->name('student.dashboard');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/photo', [ProfileController::class, 'updateProfileImage'])->name('profile.update-photo');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Route::get('/books',[BookController::class, 'index'])->name('book.index');
    Route::resource('/book', BookController::class);
});

require __DIR__.'/auth.php';
