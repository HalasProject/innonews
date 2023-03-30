<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="icon" href="/favicon.png" type="image/png" />
    <link rel="stylesheet" href="/reset-password.css" />
    <title>{{env('APP_NAME')}} | Reset Password</title>
</head>

<body>
    @if (Session::has('success'))
    <div class="alert alert-success">

        <p>{!! Session::get('success') !!}</p>

    </div>
    @endif
    @if ($errors->any())
    <div class="mb-4 alert alert-danger">
        <ul class="mt-3 list-disc list-inside text-sm text-red-600">
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif
    <div class="mainDiv">
        <div class="cardStyle">
            <form action="{{ route('password.new') }}" method="post" name="signupForm" id="signupForm">
                @csrf

                <h2 class="formTitle">
                    Reset Password
                </h2>

                <input type="hidden" name="token" value="{{ $token }}">

                <div class="inputDiv">
                    <label class="inputLabel" for="email"> {{ __('Email') }}</label>
                    <input type="email" id="email" name="email" readonly value="{{ $email }}" required>
                </div>

                <div class="inputDiv">
                    <label class="inputLabel" for="password">New Password</label>
                    <input type="password" id="password" name="password" required>
                </div>

                <div class="inputDiv">
                    <label class="inputLabel" for="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="password_confirmation">
                </div>

                <div class="buttonWrapper">
                    <button type="submit" id="submitButton" class="submitButton pure-button pure-button-primary">
                        <span>Continue</span>
                        <span id="loader"></span>
                    </button>
                </div>

            </form>
        </div>
    </div>
</body>


<script>
    var password = document.getElementById("password"),
        confirm_password = document.getElementById("confirmPassword"),
        email = document.getElementById("email");

    enableSubmitButton();

    function validatePassword() {
        if (password.value != confirm_password.value) {
            confirm_password.setCustomValidity("Passwords Don't Match");
            return false;
        } else {
            confirm_password.setCustomValidity('');
            return true;
        }
    }

    password.onchange = validatePassword;
    confirm_password.onkeyup = validatePassword;

    function enableSubmitButton() {
        document.getElementById('submitButton').disabled = false;
        document.getElementById('loader').style.display = 'none';
    }

    function disableSubmitButton() {
        document.getElementById('submitButton').disabled = true;
        document.getElementById('loader').style.display = 'unset';
    }

    function validateSignupForm() {
        var form = document.getElementById('signupForm');

        for (var i = 0; i < form.elements.length; i++) {
            if (form.elements[i].value === '' && form.elements[i].hasAttribute('required')) {
                console.log('There are some required fields!');
                return false;
            }
        }

        if (!validatePassword()) {
            return false;
        }

        onSignup();
    }

    function onSignup() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {

            disableSubmitButton();

            if (this.readyState == 4 && this.status == 200) {
                enableSubmitButton();
            } else {
                console.log('AJAX call failed!');
                setTimeout(function() {
                    enableSubmitButton();
                }, 1000);
            }

        };

        xhttp.open("GET", "ajax_info.txt", true);
        xhttp.send();
    }
</script>

</html>