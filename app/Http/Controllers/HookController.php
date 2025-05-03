<?php

namespace App\Http\Controllers;

use App\Models\Hook;
use Illuminate\Http\Request;

class HookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $query = Hook::query();
            
            if ($request->has('search')) {
                $query->where('gancho', 'like', '%'.$request->search.'%');
            }
            
            $perPage = $request->view === 'table' ? 15 : 12;
            $hooks = $query->paginate($perPage);
            
            return response()->json([
                'success' => true,
                'data' => $hooks,
                'current_page' => $hooks->currentPage(),
                'last_page' => $hooks->lastPage(),
                'prev_page_url' => $hooks->previousPageUrl(),
                'next_page_url' => $hooks->nextPageUrl(),
                'hooks' => $hooks->items() // Esto es importante para tu vista
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al cargar los ganchos',
                'error' => $e->getMessage()
            ], 500);
        }
    }




    // HookController.php
public function incrementClicks(Hook $hook)
{
    $hook->increment('clicks');
    return response()->json([
        'success' => true,
        'message' => 'Clicks incrementados correctamente',
        'clicks' => $hook->fresh()->clicks // Devuelve el valor actualizado
    ]);
}


    // public function incrementClicks(Hook $hook)
    // {
    //     $hook->increment('clicks');
    //     return response()->json(['clicks' => $hook->clicks]);
    // }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
