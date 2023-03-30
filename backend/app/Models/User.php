<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
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
class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * @var array
     */
    protected $guarded = ['id'];

    protected $hidden = ['password', 'email_verified_at', 'created_at', 'updated_at'];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'birthday' => 'datetime:Y-m-d',
    ];

    protected $appends = ['email_verified', 'fullName'];


    protected function getEmailVerifiedAttribute(): bool
    {
        return  $this->attributes['email_verified_at'] !== null;
    }

    public function getFullNameAttribute()
    {
        return $this->attributes['firstname'] . ' ' . $this->attributes['lastname'];
    }
}
