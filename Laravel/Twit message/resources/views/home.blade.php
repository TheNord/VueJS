@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        {{-- подключаем форму добавления сообщений --}}
        <form-component></form-component>
        {{-- подключаем форму списка сообщений --}}
        <timeline-component></timeline-component>
    </div>
</div>
@endsection