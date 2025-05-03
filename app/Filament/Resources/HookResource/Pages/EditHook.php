<?php

namespace App\Filament\Resources\HookResource\Pages;

use App\Filament\Resources\HookResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditHook extends EditRecord
{
    protected static string $resource = HookResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
