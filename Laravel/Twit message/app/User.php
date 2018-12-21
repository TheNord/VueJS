<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'name', 'email', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    // добавляем profileLink к модели и JSON ответу
    protected $appends = ['profileLink'];

    /** связь пользователя с постами */
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    // связь с таблицей фолловеров
    public function following()
    {
        // 1. имя связной модели 2. таблица 
        // 3. имя внешнего ключа модели, на которой вы определяете отношения   
        // 4. внешний ключ модели, с которой вы собираетесь связаться
        return $this->belongsToMany(User::class, 'followers', 'user_id', 'follower_id');
    }

    /** Текущий пользователь не равен переданному пользователю */
    public function isNot($user)
    {
        return $this->id !== $user->id;
    }

    /** Проверка на то, что текущий пользователь уже подписан на пользователя */
    public function isFollowing($user)
    {
        // через связь following находим запись, у которой follower_id будет равным
        // id пользователя в чьем профиле мы находимся и возвращаем число (true > 0)
        return (bool) $this->following->where('id', $user->id)->count();
    }

    /** Проверка на возможность подписаться на пользователя */
    public function canFollow($user)
    {
        // если переданный пользователь = текущему пользователю - запрещаем подписку
        if(!$this->isNot($user)) {
            return false;
        }
        // если пользователь еще не подписан на текущего пользователя то возвращаем true
        return !$this->isFollowing($user);
    }

    /** Проверка на возможность отписаться от пользователя */
    public function canUnFollow($user)
    {
        // если пользователь подписан на текущего пользователя то возвращаем true
        return $this->isFollowing($user);
    }

    /** Определяем "читателя"
    * Читатель будет автоматически вызван Eloquent при попытке получить значение атрибута profileLink
    * ($request->user()->profileLink) и вернет ссылку на текущего пользователя
    */
    public function getProfileLinkAttribute()
    {
        return route('user.show', $this);
    }

    /** Назначаем ключом роутера имя пользователя (/users/Name) */
    public function getRouteKeyName()
    {
        return 'name';
    }
}
