<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/products', [ProductController::class, 'getProducts']);

Route::delete('/products/{id}', [ProductController::class, 'deleteProduct']);

Route::post('/products/new', [ProductController::class, 'createProduct']);

Route::post('/products/{id}', [ProductController::class, 'updateProduct']);
 
Route::get('/products/search', [ProductController::class, 'searchInProducts']);
