$('document').ready(()=>{
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#content-container div").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
});