$(document).ready(function () {
  $("body").append(
    ' <div class="chatbot-icon"> <div class="chatbot-msg"> <div class="chatbot-close-body"> <div class="chatbot-close">x</div> </div> <p>Hola ¿Te gustaría saber algo de la vida?</p> </div> <img src="/david.jpg" /> </div><div class="chatbot"> <div class="chatbot-body"></div> <div class="chatbot-submit"> <form id="form" method="POST"> <input type="text" name="prompt" id="prompt" /> <button type="submit"></button> </form> </div> </div>'
  );

  $(".chatbot-icon").click(function () {
    $(".chatbot").css("display", "block");
    $(".chatbot-icon").css("display", "none");
  });

  $("#form").submit(function () {
    let values = $("#form").serialize();
    $(".chatbot-body").append(
      ' <div class="chatbot-question"> <div class="chatbot-img"> <img src="https://cdn.jsdelivr.net/gh/Lolichess/chatbot@3168c460095e8c5d3fa1f383cb0b61bd8ac31c6c/public/user.jpg" /> </div> <div class="chatbot-text"> <p>' +
        $("#prompt").val() +
        "</p> </div> </div>"
    );
    $("#prompt").val("");
    $.ajax({
      url: "https://chatbot-benito-david.herokuapp.com/",
      type: "POST",
      data: values,
      success: function (data) {
        $(".chatbot-body").append(
          ' <div class="chatbot-question bot-ans"> <div class="chatbot-img"> <img src="https://cdn.jsdelivr.net/gh/Lolichess/chatbot@3168c460095e8c5d3fa1f383cb0b61bd8ac31c6c/public/david.jpg" /> </div> <div class="chatbot-text"> <p>' +
            data[0].text +
            "</p> </div> </div>"
        );
      },
    });
    return false;
  });
});
