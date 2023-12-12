$(document).ready(function() {

    $('.admin-auth-form').on("submit", (e) => {
        e.preventDefault();
        $.ajax({
            url: '/admin/login.php',
            method: 'post',
            dataType: 'json',
            data: {
                login: $("#admin-login").val(),
                password: $("#admin-password").val()
            },
            success: function (data) {
                if (data.errors.length != 0) {
                    for (let i = 0; i < data.errors.length; i++) {
                        console.log(data.errors[i])
                        $('.alerts').append("<div class='alert error'>" + data.errors[i] + "</div>")
                    }
                    $('.alerts').css({
                        top: "0",
                        transition: "ease 0.9s"
                    })
                    setTimeout(() => {
                        $('.alerts').css({
                            top: "-100%",
                            transition: "ease 0.6s"
                        })
                        $('.error').remove()
                    }, 2000)
                } else {
                    $('.alerts').append("<div class='alert success'>" + data.success + "</div>")
                    $('.alerts').css({
                        top: "0",
                        transition: "ease 0.9s"
                    })
                    setTimeout(() => {
                        $('.alerts').css({
                            top: "-100%",
                            transition: "ease 0.6s"
                        })
                        location.reload()
                    }, 2000)
                }
            }
        })
    })

    $('.admin-content__form').css({
        display: 'none'
    })
    $('.items__item').on('click', function () {
        $('.title-h1').text($(this).data('find'))
        switch ($(this).data('find')) {
            case 'Настройки':
                $.ajax({
                    url: '/admin/getSettings.php',
                    type: 'GET',
                    dataType: 'json',
                    success: function (response) {
                        console.log(response.length);
                        let settingsForm = `<form class='settings'>`;
                        settingsForm += `<input id='setting-title' value='${response.title}'>`;
                        settingsForm += `<input id='setting-email' value='${response.email}'>`;
                        settingsForm += `<button type='submit'>Применить</button>`;
                        settingsForm += `</form>`; 
                        $('.admin-content').append(settingsForm);
                    }
                })
                break
            case 'Настройки2':

                break
            default:
                alert($(this).text() + " еще в разработке")
        }
    })

    $(document).on('submit', '.settings', function (e) {
        e.preventDefault()
        alert('mama')
        $.ajax({
            url: '/admin/setSettings.php',
            type: 'post',
            dataType: 'json',
            data: {
                title: $('#setting-title').val(),
                email: $('#setting-email').val()
            },
            success: function (data) {
                console.log(data)
            }
        })
    })
})