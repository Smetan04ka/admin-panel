function ajaxShowGallery() {
    $('.gallery__item').remove()
    $.ajax({
        url: '/admin/getGallery.php',
        type: 'GET',
        dataType: 'json',
        success: function (responce) {
            let galleryBlock = `<div class="gallery">`
            for (let i = 0; i < responce.length; i++) {

                galleryBlock += `<div class='gallery__item'>`
                galleryBlock += `<img src='${responce[i].img}' alt='${responce[i].name}'>`
                galleryBlock += `<div class='item__options'>`
                galleryBlock += `<h2>${responce[i].name}</h2>`
                galleryBlock += `<p>добавлено: ${responce[i].created_at}</p>`
                galleryBlock += `<p>обновлено: ${responce[i].updated_at}</p>`
                galleryBlock += `</div>`
                galleryBlock += `<div class='item__options'>`
                galleryBlock += `<button class='gallery-update primary' data-gallery=${responce[i].id}>Редактировать</button>`
                galleryBlock += `<button class='gallery-delete delete' data-gallery=${responce[i].id}>Удалить</button>`
                galleryBlock += `</div>`
                galleryBlock += `</div>`
            }
            galleryBlock += `</div>`
            $('.admin-content').append(galleryBlock);
        }
    })
}
$(document).ready(function () {

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
        $('.items__item').css({
            background: "rgb(23, 24, 29)"
        })
        $('.title-h1').text($(this).data('find'))
        $('.admin-content').html("")
        $(this).css({
            background: "red",
            transition: "ease 0.4s"
        })
        switch ($(this).data('find')) {
            case 'Настройки':
                $.ajax({
                    url: '/admin/getSettings.php',
                    type: 'GET',
                    dataType: 'json',
                    success: function (response) {
                        let settingsForm = `<form class='settings'>`;
                        settingsForm += `<input id='setting-title' value='${response.title}'>`;
                        settingsForm += `<input id='setting-email' value='${response.email}'>`;
                        settingsForm += `<button type='submit'>Применить</button>`;
                        settingsForm += `</form>`;
                        $('.admin-content').append(settingsForm);
                    }
                })
                break
            case 'Галлерея':
                ajaxShowGallery()
                break
            default:
                alert($(this).text() + " еще в разработке")
        }
    })



    $(document).on('submit', '.settings', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/admin/setSettings.php',
            type: 'post',
            dataType: 'json',
            data: {
                title: $('#setting-title').val(),
                email: $('#setting-email').val()
            },
            success: function (data) {
                $('.alerts').html('')
                $('.alerts').append("<div class='alert success'>" + data + "</div>")
                $('.alerts').css({
                    top: "0",
                    transition: "ease 0.9s"
                })
                setTimeout(() => {
                    $('.alerts').css({
                        top: "-100%",
                        transition: "ease 0.6s"
                    })
                }, 6000)
            }
        })
    })


    $(document).on('click', '.gallery-delete', function () {
        $.ajax({
            url: '/admin/galleryDelete.php',
            type: 'post',
            dataType: 'json',
            data: {
                id: parseInt($(this).data('gallery'))
            },
            success: function (data) {

                ajaxShowGallery()
                $('.alerts').html('')
                $('.alerts').append("<div class='alert success'>" + data + "</div>")
                $('.alerts').css({
                    top: "0",
                    transition: "ease 0.9s"
                })
                setTimeout(() => {
                    $('.alerts').css({
                        top: "-100%",
                        transition: "ease 0.6s"
                    })
                }, 2000)
            }
        })
    })

    $(document).on('click', ".gallery-update", function () {
        $.ajax({
            url: '/admin/getGalleryById.php',
            type: 'POST',
            dataType: 'json',
            data: {
                id: parseInt($(this).data('gallery'))
            },
            success: function (response) {
                let galleryUpdateBlock = `<div class='galleryUpdateBlock'>`
                galleryUpdateBlock += `<form data-gall='${response.id}' class='galleryUpdateBlock__form' enctype='multipart/form-data'>`
                galleryUpdateBlock += `<div class='close-con'>`
                galleryUpdateBlock += `<p class='primary close-gall'>`
                galleryUpdateBlock += `Закрыть`
                galleryUpdateBlock += `</p>`
                galleryUpdateBlock += `</div>`
                galleryUpdateBlock += `<label for='gallery-input-name'>`
                galleryUpdateBlock += `Имя`
                galleryUpdateBlock += `</label>`
                galleryUpdateBlock += `<input type='text' id='gallery-input-name' value='${response.name}'>`
                galleryUpdateBlock += `<input type='file' id='gallery-input-img' value='${response.img}'>`
                galleryUpdateBlock += `<label for='gallery-input-img'>`
                galleryUpdateBlock += `<img src='${response.img}'>`
                galleryUpdateBlock += `<div class='upload-text'>`
                galleryUpdateBlock += `Загрузите изображение`
                galleryUpdateBlock += `</div>`
                galleryUpdateBlock += `</label>`
                galleryUpdateBlock += `<button  type='submit'>`
                galleryUpdateBlock += `Применить`
                galleryUpdateBlock += `</button>`
                galleryUpdateBlock += `</form>`
                galleryUpdateBlock += `</div>`
                $('.admin-content').append(galleryUpdateBlock);
            }
        })

    })

    $(document).on('submit', '.galleryUpdateBlock__form', function (e) {
        e.preventDefault();
    
        const formData = new FormData(this); // 'this' ссылается на текущую форму
    
        $.ajax({
            url: '/admin/galleryApdate.php', // исправлено имя файла
            method: 'post',
            dataType: 'json',
            processData: false, // Отключить обработку данных jQuery
            contentType: false, // Отключить установку заголовка типа контента
            data: formData,
            success: function(data) {
                console.log(data);
                ajaxShowGallery();
                // ваш код для отображения уведомлений...
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Ошибки: ' + textStatus + '. ' + errorThrown);
            }
        });
    });

    $(document).on('click', '.close-gall', function (e) {
        e.preventDefault()
        $('.galleryUpdateBlock').remove()
    })
})