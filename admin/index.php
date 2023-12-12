<? require_once __DIR__ . '/header.php'; ?>
<? if (empty($_SESSION['is_admin'])) : ?>
    <div class="container">
        <form class="admin-auth-form" action='/admin/login.php' method="post">
            <div class="admin-auth-form__title">
                <h1>Admin panel</h1>
            </div>
            <div class="admin-auth-form__fields">
                <input id='admin-login' type="text" name="login" placeholder="login">
                <input id='admin-password' type="password" name="password" placeholder="* * *">
            </div>
            <div class="admin_auth-form__button">
                <button id="admin-login" type="submit">Войти</button>
            </div>
        </form>
        <script>
           
        </script>
    </div>

<? else : ?>
    <div class="container">
        <div class="title">
            <h1 class="title-h1"></h1>
        </div>
        <div class="admin-content">
            <!-- <form class='admin-content__form'>
                <input type='text' placeholder='Имя Сайта'>
                <button type='submit'>Применить</button>
            </form> -->
        </div>
    </div>

    <script>
       
    </script>

<? endif ?>
<? require_once __DIR__ . '/footer.php' ?>