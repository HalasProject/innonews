<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="icon" href="favicon.png" type="image/png" />
    <title>Innonews v{{env('APP_VERSION')}}</title>
    <link rel="stylesheet" href="/style.css" />
</head>

<body>
    <div class="header">
        <!--Content before waves-->
        <div class="inner-header flex">
            <!--Just the logo.. Don't mind this-->
            <h1>Innonews <b>v{{env('APP_VERSION')}} <br><small style="font-size:25px"><b>{{env('APP_ENV')}}<b></small></b></h1>
        </div>

        <!--Waves Container-->
        <div>
            <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g class="parallax">
                    <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                    <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                    <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                    <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
                </g>
            </svg>
        </div>
        <!--Waves end-->
    </div>
    <!--Header ends-->

    <!--Content starts-->
    <div class="content flex">
        <p>
            Innoscripta News By Salah Bentayeb| <span id="year"></span>
            <script>
                document.getElementById(
                    "year"
                ).innerHTML = new Date().getFullYear();
            </script>
        </p>
    </div>
    <!--Content ends-->
</body>

</html>
