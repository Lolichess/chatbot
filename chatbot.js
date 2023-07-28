$(document).ready(function () {
  $("body").append(
    ' <div class="chatbot-icon"> <div class="chatbot-msg"> <div class="chatbot-close-body"> <div class="chatbot-close">x</div> </div> <p>Soy chatgpt puedes preguntar cualquier duda sobre qué es web3?</p> </div> <img src="https://cdn.jsdelivr.net/gh/Lolichess/chatbot@07d078995a10d1f49e27ad4ec4b259a70304111f/public/logo_chatbot.png" /> </div><div class="chatbot"><div class="chatbot-header"><div class="chatbot-minimize"></div></div> <div class="chatbot-body"></div> <div class="chatbot-submit"><div class="question-relative"><div class="question">¿Qué es Web 3?</div><div class="question">¿Qué es AI generativa?</div><div class="question">¿Cómo puedo orientar mi carrera hacia Blockchain?</div></div><div class="chatbot-writing">ChatGPT escribiendo...</div> <form id="form" method="POST"> <input type="text" name="prompt" id="prompt" autocomplete="off" /> <button type="submit"></button> </form> </div> </div>'
  );

  $(".chatbot-icon").click(function (e) {
    e.stopPropagation();
    $(".chatbot").css("display", "block");
    $(".chatbot-icon").css("display", "none");
    $("#prompt").focus();
  });

  $(".chatbot-close").click(function (e) {
    e.stopPropagation();
    $(".chatbot-msg").css("display", "none");
  });

  $(".chatbot-minimize").click(function () {
    $(".chatbot").css("display", "none");
    $(".chatbot-icon").css("display", "block");
  });

  $(".question").click(function () {
    $(".chatbot-body").append(
      ' <div class="chatbot-question"> <div class="chatbot-img"> <img src="https://cdn.jsdelivr.net/gh/Lolichess/chatbot@ceeb2ee66ae6d98ae0a1939df3601606852390f2/public/user.jpg" /> </div> <div class="chatbot-text"> <p>' +
        $(this).text() +
        "</p> </div> </div>"
    );
    $("#prompt").val("");
    $(this).parent().css("display", "none");
    $(".chatbot-writing").css("display", "block");
    $.ajax({
      url: "https://chatbot-production-31f0.up.railway.app/",
      type: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        prompt: $(this).text(),
      }),
      success: function (data) {
        $(".chatbot-body").append(
          ' <div class="chatbot-question bot-ans"> <div class="chatbot-img"> <img src="https://cdn.jsdelivr.net/gh/Lolichess/chatbot@07d078995a10d1f49e27ad4ec4b259a70304111f/public/logo_chatbot.png" /> </div> <div class="chatbot-text"> <p>' +
            data[0].text +
            "</p> </div> </div>"
        );
        $(".chatbot-writing").css("display", "none");
        $(".chatbot-body").scrollTop($(".chatbot-body")[0].scrollHeight);
      },
    });
  });

  $("#form").submit(function () {
    $(".chatbot-body").append(
      ' <div class="chatbot-question"> <div class="chatbot-img"> <img src="https://cdn.jsdelivr.net/gh/Lolichess/chatbot@ceeb2ee66ae6d98ae0a1939df3601606852390f2/public/user.jpg" /> </div> <div class="chatbot-text"> <p>' +
        $("#prompt").val() +
        "</p> </div> </div>"
    );
    $("#prompt").val("");
    $(".question-relative").css("display", "none");
    $(".chatbot-writing").css("display", "block");
    $.ajax({
      url: "https://chatbot-production-31f0.up.railway.app/",
      type: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        prompt: $("#prompt").val(),
      }),
      success: function (data) {
        $(".chatbot-body").append(
          ' <div class="chatbot-question bot-ans"> <div class="chatbot-img"> <img src="https://cdn.jsdelivr.net/gh/Lolichess/chatbot@07d078995a10d1f49e27ad4ec4b259a70304111f/public/logo_chatbot.png" /> </div> <div class="chatbot-text"> <p>' +
            data[0].text +
            "</p> </div> </div>"
        );
        $(".chatbot-writing").css("display", "none");
        $(".chatbot-body").scrollTop($(".chatbot-body")[0].scrollHeight);
      },
    });
    return false;
  });
});
