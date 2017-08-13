$.get("/navbar.html", function(data){
  $("#navbar").replaceWith(data);
});

$('#slidesModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var displayUrl = "https://docs.google.com/a/wcsu.net/presentation/d/" + button.data('slides-id') + "/embed?start=false&loop=true&delayms=10000";// Extract info from data-* attributes
  var editUrl = "location.href='https://docs.google.com/presentation/d/" + button.data('slides-id') + "/edit'";// Extract info from data-* attributes
  var modal = $(this)
  $('#slidesIframe').attr('src',displayUrl);
  $('#slidesEditButton').attr('onClick',editUrl);
})

// autonumber blockquotes
function autoNumberBlockquotes() {
  console.log("autonumbering blockquotes");
  var blockquoteNumber = 1;
  $("blockquote").each(function(){
    console.log($(this).text());
    $(this).text(blockquoteNumber + ". " + $(this).text());
    blockquoteNumber++;
  });
}
