$(document).ready(function () {
  $("body").append(
    ' <div class="chatbot-icon"> <div class="chatbot-msg"> <div class="chatbot-close-body"> <div class="chatbot-close">x</div> </div> <p>Soy Benito Pérez Galdós puedes preguntar cualquier duda sobre mi?</p> </div> <img src="https://cdn.jsdelivr.net/gh/Lolichess/chatbot@4860a762fc05d811b7565459975414ac17fba85a/public/perez_galdos_benito.jpg" /> </div><div class="chatbot"><div class="chatbot-header"><div class="chatbot-minimize"></div></div> <div class="chatbot-body"></div> <div class="chatbot-submit"><div class="chatbot-writing">Benito Pérez Galdós escribiendo...</div> <form id="form" method="POST"> <input type="text" name="prompt" id="prompt" autocomplete="off" /> <button type="submit"></button> </form> </div> </div>'
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

  $("#form").submit(function () {
    let values = "prompt=" + encodeURIComponent($("#prompt").val());
    $(".chatbot-body").append(
      ' <div class="chatbot-question"> <div class="chatbot-img"> <img src="https://cdn.jsdelivr.net/gh/Lolichess/chatbot@ceeb2ee66ae6d98ae0a1939df3601606852390f2/public/user.jpg" /> </div> <div class="chatbot-text"> <p>' +
        $("#prompt").val() +
        "</p> </div> </div>"
    );
    $("#prompt").val("");
    $(".chatbot-writing").css("display", "block");
    $.ajax({
      url: "https://chatbot-benito-david.herokuapp.com/",
      type: "POST",
      data: values,
      success: function (data) {
        $(".chatbot-body").append(
          ' <div class="chatbot-question bot-ans"> <div class="chatbot-img"> <img src="https://cdn.jsdelivr.net/gh/Lolichess/chatbot@4860a762fc05d811b7565459975414ac17fba85a/public/perez_galdos_benito.jpg" /> </div> <div class="chatbot-text"> <p>' +
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
