<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Hook;
class HookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ganchos = [
            'Cuando estés buscando :x no cometas este error :y',
            'El libro que cambió mi forma de ver :tema',
            'Top 5 :tema que necesitas conocer',
            'Esto fue lo que hice para lograr :objetivoDelCliente',
            'Deja de cometer este error común :acciónIncorrecta',
            '5 cosas que me permitieron alcanzar :meta',
            'Así es como esta app me ayudó a lograr :resultado',
            'Saber esto me ahorró 5 años de esfuerzo',
            'Tienes que ver/leer/escuchar :esto',
            'Lo que nadie quiere que sepas sobre :tema',
            'Nadie te ha contado esto sobre :tema',
            'Si ves esto es una señal',
            'No vas a creer lo que descubrí',
            'Cómo conseguí :resultado sin :sufrimientoComún',
            'Quédate hasta el final si quieres saber :secretoBeneficio',
            'Ya sé por qué nadie ve tus videos y cómo solucionarlo',
            'Esto es algo que nadie te dice sobre :tema',
            'Si solo tuviera :xTiempo al día para :objetivo haría esto',
            'Yo también pensaba :creenciaComún hasta que descubrí esto',
            'Cómo es posible que no hayamos hablado de esto antes',
            'Después de :tiempo trabajando con :públicoObjetivo entendí esto sobre :dolor',
            'El consejo para principiantes en :actividad que me hubiera gustado recibir',
            'No estoy orgulloso de esto pero debo confesar algo',
            'Por fin llegó el momento de dejar de hacer :errorComún',
            'Si eres :públicoObjetivo esto te interesa',
            'Esta opinión no te gustará pero necesitas escucharla'
        ];

        foreach ($ganchos as $gancho) {
            Hook::create([
                'gancho' => $gancho,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
