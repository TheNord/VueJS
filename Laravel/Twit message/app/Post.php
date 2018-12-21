<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
	protected $fillable = ['user_id', 'body'];

	// Добавляем значение createdDate к JSON ответу и в массив модели
    protected $appends = ['createdDate'];

    /** Связь с пользователем */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /** Определяем "читателя"
      * Читатель будет автоматически вызван Eloquent при попытке получить значение атрибута createdDate 
      *  и приведет его к виду (Отправлен 10 минут назад) 
      */
    public function getCreatedDateAttribute()
    {
        return $this->created_at->diffForHumans();
    }
}
