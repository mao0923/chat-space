$(function() {
  function buildHTML(message){
    if (message.image) {
      var html = 
        `<div class="main-message__box" data-item_id=${message.id}>
          <div class="main-message__box-upper">
            <div class="main-message__box-upper-name">
              ${message.user_name}
            </div>
            <div class="main-message__box-upper-date">
              ${message.created_at}
            </div>
          </div>
          <div class="main-message__box-comment">
            <p class="main-message__box-comment__content">
              ${message.content}
            </p>
            <img class="main-message__box-comment__image" src=${message.image}>
          </div>
        </div>`
      return html;
    } else {
      var html = 
        `<div class="main-message__box" data-item_id=${message.id}>
          <div class="main-message__box-upper">
            <div class="main-message__box-upper-name">
              ${message.user_name}
            </div>
            <div class="main-message__box-upper-date">
              ${message.created_at}
            </div>
          </div>
          <div class="main-message__box-comment">
            <p class="main-message__box-comment__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-message').append(html);
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.main-message').animate({ scrollTop: $('.main-message')[0].scrollHeight});
    })
    .fail(function() {
          alert("メッセージ送信に失敗しました")
    });
  });
});