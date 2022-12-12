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
      ' <div class="chatbot-question"> <div class="chatbot-img"> <img src="https://cdn.jsdelivr.net/gh/Lolichess/chatbot@ceeb2ee66ae6d98ae0a1939df3601606852390f2/public/user.jpg" /> </div> <div class="chatbot-text"> <p>' +
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
          ' <div class="chatbot-question bot-ans"> <div class="chatbot-img"> <img src="https://cdn.jsdelivr.net/gh/Lolichess/chatbot@ceeb2ee66ae6d98ae0a1939df3601606852390f2/public/david.jpg" /> </div> <div class="chatbot-text"> <p>' +
            data[0].text +
            "</p> </div> </div>"
        );
      },
    });
    return false;
  });
});
