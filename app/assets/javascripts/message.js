$(function() {
  function buildHTML(message){
    if (message.image) {
      var html = 
        `<div class="message" data-message-id=${message.id}>
          <div class="main-message__box">
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
          </div>
        </div>`
      return html;
    } else {
      var html =
        `<div class="message" data-message-id=${message.id}>
          <div class="main-message__box">
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

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-message').append(insertHTML);
        $('.main-message').animate({ scrollTop: $('.main-message')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  }; 
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});