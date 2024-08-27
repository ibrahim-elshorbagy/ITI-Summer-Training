<?php

namespace App\Http\Controllers;

use App\Http\Resources\StudentResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class AdminController extends Controller
{


    public function switch()
    {
        $user = Auth::user();

        if ($user->hasRole('admin')) {
            return Redirect::route('admin.dashboard');
        }

        if ($user->hasRole('student')) {
            return Redirect::route('student.dashboard');
        }

        return abort(403, 'Unauthorized');
    }


    public function dashboard(){
        return inertia('Admin/Dashboard');
    }
    /**
     * Display a listing of the resource.
     */
    public function students()
    {
        $query = User::role('student');

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("email")) {
            $query->where("email", "like", "%" . request("email") . "%");
        }
        if (request("id")) {
            $query->where("id", "like", "%" . request("id") . "%");
        }

        $users = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Admin/StudentsList", [
            "users" => StudentResource::collection($users),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    public function show(string $id)
    {
        $user = User::role('student')->findOrFail($id);

        return inertia("Admin/StudentShow", [
            'user' => new StudentResource($user),
        ]);
    }


}
