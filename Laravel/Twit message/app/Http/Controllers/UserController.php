<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
	/** Отображаем страницу с инфорацией о пользователе */
	public function show(User $user)
	{
		return view('user', compact('user'));
	}

	/** подписываемся на пользователя */
	public function follow(Request $request, User $user)
	{
		// Обращаемся к пользователю через реквест, и проверяем, 
		// если пользователь может подписаться (ранее не подписан и это не он сам)
		if($request->user()->canFollow($user)) {
	    	// через модель User и связь following, добавляем пользователя 
			$request->user()->following()->attach($user);
		}
		return redirect()->back();
	}

	/** отписываемся от пользователя */
	public function unFollow(Request $request, User $user)
	{
		// Проверка на возможность отписаться (был ранее подписан)
		if($request->user()->canUnFollow($user)) {
	   		// через связь открепляем пользователя
			$request->user()->following()->detach($user);
		}
		return redirect()->back();
	}
}