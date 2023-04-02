<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * @property int $id
 * @property string $password
 * @property string $firstname
 * @property string $lastname
 * @property string $email
 * @property boolean $reset_password
 * @property string $last_login
 */
class Feed extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'feeds';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    protected $fillable = ['category', 'date_from', 'date_to', 'nyt', 'theguardian', 'newsapi'];

    protected $hidden = ['user_id', 'id', 'created_at', 'updated_at'];

    public function toArray()
    {
        $array = parent::toArray();
        $array['sources'] = [
            'newsapi' => $array['newsapi'],
            'nyt' => $array['nyt'],
            'theguardian' => $array['theguardian'],
        ];
        $array = array_intersect_key($array, array_flip(['sources', 'category', 'date_from', 'date_to']));

        return $array;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
