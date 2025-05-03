<?php

namespace App\Filament\Resources\HookResource\Pages;

use App\Filament\Resources\HookResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListHooks extends ListRecords
{
    protected static string $resource = HookResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
