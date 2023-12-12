<? require_once __DIR__ . '/../config.php' ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="src/css/style.css">
    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
</head>

<body>
    <div class="alerts"></div>
    <main>
        <header>
            <div class="header__top">
                <div class="top__logo">
                    <a href="/admin"><img src="https://img2.freepng.ru/20180408/yue/kisspng-mon-logo-emblem-europe-symbol-badges-5acaa6ce8f89d8.9904343415232304145879.jpg" alt=""></a>
                </div>
                <div class="top__search">
                    <form action="/search">
                        <input type="search" name="search" placeholder="Поиск...">
                        <button>Поиск</button>
                    </form>
                </div>
            </div>
            <div class="header__main">
                <div class="main__navigate">
                    <a href="">asd</a>
                    <a href="">sdffg</a>
                    <a href="">sdfh</a>
                </div>
                <div class="main__user">
                    <? if (empty($_SESSION['is_admin'])) : ?>
                    <? else : ?>
                        <a href="?exit">выйти</a>
                        <?
                        if (isset($_GET['exit'])) {
                            unset($_SESSION['is_admin']);
                            header("Refresh:1");
                        }
                        ?>
                    <? endif ?>
                </div>
            </div>
        </header>
        <? if ($_SESSION['is_admin']) : ?>
            <div class="admin-menu">
                <div class="admin-menu__items">
                    <div class="items__item" data-find='Настройки'>
                        <img src="https://sun6-21.userapi.com/s/v1/if1/L3_pHhVYstNXWYUTKwLjR-9ASMgSlN9Mr1jRboCHdWdcQPwh5_4xROXAogFt3kuFR4pWAUh9.jpg?size=1024x1024&quality=96&crop=0,0,1024,1024&ava=1" alt="">
                        <a href="">Настройки</a>
                    </div>
                    <div class="items__item" data-find='Галлерея'>
                        <img src="https://w7.pngwing.com/pngs/642/416/png-transparent-photo-image-landscape-icon-images.png" alt="">
                        <a href="">Галлерея</a>
                    </div>
                    <div class="items__item" data-find='Посты'>
                        <img src="https://w7.pngwing.com/pngs/435/74/png-transparent-computer-icons-business-service-symbol-web-service-logo-business.png" alt="">
                        <a href="">Посты</a>
                    </div>
                    <div class="items__item" data-find='Отзывы'>
                        <img src="https://w7.pngwing.com/pngs/112/860/png-transparent-dash-cryptocurrency-ethereum-bitcoin-payment-wonderful-review-blue-text-trademark.png" alt="">
                        <a href="">Отзывы</a>
                    </div>
                </div>
            </div>
            <script>
               
            </script>
        <? endif ?>