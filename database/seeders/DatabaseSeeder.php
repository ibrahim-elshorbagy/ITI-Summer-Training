<?php

namespace Database\Seeders;


use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {



        $this->call(RolesAndPermissionsSeeder::class);
        $this->call(BooksTableSeeder::class);

        //admin
        $user = User::factory()->create([
            'name' => 'ibrahim elshorbagy',
            'email' => 'a@a.a',
            'password' =>Hash::make('a'),
            'profile_photo_url'=>'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        ]);
        $user->assignRole('admin');

        $user = User::factory()->create([
            'name' => 'Ahmed Student',
            'email' => 's@s.s',
            'password' =>Hash::make('s'),
            'profile_photo_url'=>'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        ]);
        $user->assignRole('student');

        User::factory(20)->create([
                    'password' => Hash::make('s'),  // Same password for all students
                    'profile_photo_url' => 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', // Same default photo
                ])->each(function ($user) {
                    $user->assignRole('student');
                });


    }
}
