<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;

class PostController extends Controller
{
	public function index(Request $request, Post $post)
    {
        // пользователь, вошедший в систему, может видеть свой пост, а также пост других людей, за которым он следит в данный момент

		// получаем все посты, где user_id = user_id в таблице фолловеров 
		// (обращаемся через модель User (она приходит в реквесте) к связи фолловеров (таблице)), 
		// push'им к запросу ид текущего пользователя (автора постов)	
		// добавляем к коллекции отношения с user - with('user') 
		// сортируем по дате создания - orderBy(), сверху новые
		// получаем коллекцию с указанным количеством элементов - take()
       $posts = $post->whereIn('user_id', $request->user()->following()
                        ->pluck('users.id')
                        ->push($request->user()->id))
                        ->with('user')
                        ->orderBy('created_at', 'desc')
                        ->take($request->get('limit', 10))
                        ->get(); 

        // возвращаем json ответ
        return response()->json($posts);
    }

    /** Сохранение новых постов */
    public function store(Request $request, Post $post)
    {
    	// Из реквеста обращаемся к модели User, далее через связь с постами создаем новую запись
        $newPost = $request->user()->posts()->create([
            'body' => $request->get('body')
        ]);

   		// возвращаем json ответ, обращаемся к модели Post 
   		// добавляем к связи нашего пользователя и сам пост 
        return response()->json($post->with('user')->find($newPost->id));
    }
}
