$.get( "/navbar.html", function( data ) {
  $( "#navbar" ).replaceWith( data );
} );
autoNumberQuestions();
$.getJSON( "/assets/data/test.json", function( data ) {
  var items = [];
  console.log( "reading" );
  $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
    console.log( val );
  } );
  console.log( "goodbye" );
  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  } ).appendTo( "body" );
} );
$( '#slidesModal' ).on( 'show.bs.modal', function( event ) {
  var button = $( event.relatedTarget ) // Button that triggered the modal
  var displayUrl = "https://docs.google.com/a/wcsu.net/presentation/d/" + button.data( 'slides-id' ) + "/embed?start=false&loop=true&delayms=10000"; // Extract info from data-* attributes
  var editUrl = "location.href='https://docs.google.com/presentation/d/" + button.data( 'slides-id' ) + "/edit'"; // Extract info from data-* attributes
  var modal = $( this )
  $( '#slidesIframe' ).attr( 'src', displayUrl );
  $( '#slidesEditButton' ).attr( 'onClick', editUrl );
} )
// autonumber blockquotes
function autoNumberQuestions() {
  console.log( "autonumbering questions" );
  var questionNumber = 1;
  $( ".question" ).each( function() {
    console.log( $( this ).html() );
    $( this ).html( questionNumber + ". " + $( this ).html() );
    questionNumber++;
  } );
}
