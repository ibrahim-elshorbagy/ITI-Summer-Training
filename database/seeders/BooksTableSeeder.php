<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BooksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('books')->insert([
            [
                'title' => 'أولاد حارتنا',
                'author' => 'نجيب محفوظ',
                'description' => 'رواية أدبية تعتبر من أبرز أعمال نجيب محفوظ تتناول صراع الخير والشر في المجتمع.',
                'cover_photo_url' => 'https://cdn-icons-png.flaticon.com/512/29/29302.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'الأسود يليق بك',
                'author' => 'أحلام مستغانمي',
                'description' => 'رواية رومانسية تتحدث عن الحب والكرامة من تأليف الكاتبة الجزائرية أحلام مستغانمي.',
                'cover_photo_url' => 'https://cdn-icons-png.flaticon.com/512/29/29302.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'في قلبي أنثى عبرية',
                'author' => 'خولة حمدي',
                'description' => 'رواية اجتماعية تسرد قصة حب مليئة بالمعاناة والألم بين شخصين من ثقافات مختلفة.',
                'cover_photo_url' => 'https://cdn-icons-png.flaticon.com/512/29/29302.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'عائد إلى حيفا',
                'author' => 'غسان كنفاني',
                'description' => 'رواية قصيرة تتناول مسألة العودة الفلسطينية والهوية من خلال قصة إنسانية مؤثرة.',
                'cover_photo_url' => 'https://cdn-icons-png.flaticon.com/512/29/29302.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'رأيت رام الله',
                'author' => 'مريد البرغوثي',
                'description' => 'سيرة ذاتية تتحدث عن العودة إلى الوطن بعد سنوات من المنفى، بأسلوب أدبي شاعري.',
                'cover_photo_url' => 'https://cdn-icons-png.flaticon.com/512/29/29302.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
