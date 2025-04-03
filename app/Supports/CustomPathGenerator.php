<?php

namespace App\Supports;

use Spatie\MediaLibrary\Support\PathGenerator\PathGenerator;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class CustomPathGenerator implements PathGenerator
{
    public function getPath(Media $media): string
    {
        $nameFolder = $this->createFolder($media->model_type);
        return 'media/' . $nameFolder . '/';
    }

    public function getPathForConversions(Media $media): string
    {
        $nameFolder = $this->createFolder($media->model_type);
        return 'media/' . $nameFolder . '/conversions/';
    }

    public function getPathForResponsiveImages(Media $media): string
    {
        $nameFolder = $this->createFolder($media->model_type);
        return 'media/' . $nameFolder . '/responsive/';
    }

    /*
     * Метод создает папку для конкретной модели и избавляет от префикса 'App\Models\'
     */
    protected function createFolder(string $path): string
    {
        return strtolower(str_replace('App\\Models\\', '', $path));
    }
}